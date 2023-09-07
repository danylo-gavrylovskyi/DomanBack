import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	createUser(dto: CreateUserDto) {
		return this.userRepository.create(dto);
	}

	findOne(filter: {
		where: { id?: number; email?: string; password?: string; phoneNumber?: string };
	}): Promise<User> {
		return this.userRepository.findOne({ ...filter });
	}

	async checkForExistingUser(email: string) {
		const doesEmailExist = await this.findOne({ where: { email } });

		if (doesEmailExist) {
			return doesEmailExist;
		}

		return false;
	}
}
