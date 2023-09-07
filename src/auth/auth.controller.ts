import {
	Body,
	Controller,
	InternalServerErrorException,
	Post,
	UsePipes,
	ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() dto: AuthDto) {
		try {
			return this.authService.register(dto);
		} catch (error) {
			throw new InternalServerErrorException("Error while registering user");
		}
	}

	@UsePipes(new ValidationPipe())
	@Post("login")
	async login(@Body() dto: Pick<AuthDto, "email" | "password">) {
		try {
			return this.authService.login(dto);
		} catch (error) {
			throw new InternalServerErrorException("Error while loging user in");
		}
	}

	@UsePipes(new ValidationPipe())
	@Post("login/access-token")
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		try {
			return this.authService.getNewTokens(dto.refreshToken);
		} catch (error) {
			throw new InternalServerErrorException("Error while getting new tokens");
		}
	}
}
