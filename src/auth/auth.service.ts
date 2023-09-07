import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthDto } from "./dto/auth.dto";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.model";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwt: JwtService) {}

	async register(dto: AuthDto) {
		const doesUserExist = await this.usersService.checkForExistingUser(dto.email);
		if (doesUserExist) {
			throw new BadRequestException("User already exists");
		}

		const hashedPassword = await bcrypt.hash(dto.password, 10);
		const user = await this.usersService.createUser({
			firstName: dto.firstName,
			lastName: dto.lastName,
			phoneNumber: dto.phoneNumber,
			email: dto.email,
			password: hashedPassword,
		});

		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken);
		if (!result) {
			throw new UnauthorizedException("Invalid refresh token");
		}

		const user = await this.usersService.findOne({ where: { id: result.id } });

		const tokens = this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	async login(dto: Pick<AuthDto, "email" | "password">) {
		const user = await this.validateUser(dto);
		const tokens = await this.issueTokens(user.id);

		return {
			user: this.returnUserFields(user),
			...tokens,
		};
	}

	private async issueTokens(userId: number) {
		const data = { id: userId };

		const accessToken = this.jwt.sign(data, {
			expiresIn: "1h",
		});

		const refreshToken = this.jwt.sign(data, {
			expiresIn: "7d",
		});

		return { accessToken, refreshToken };
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
			email: user.email,
			isAdmin: user.isAdmin,
		};
	}

	private async validateUser(dto: Pick<AuthDto, "email" | "password">) {
		const foundUser = await this.usersService.checkForExistingUser(dto.email);

		if (!foundUser) {
			throw new NotFoundException("User not found");
		}

		const isValid = await bcrypt.compare(dto.password, foundUser.password);
		if (!isValid) {
			throw new UnauthorizedException("Invalid password");
		}

		return foundUser;
	}
}
