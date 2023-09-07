import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.model";
import { CreateUserDto } from "./dto/createUser.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ description: "Creating new user" })
	@ApiResponse({ type: User })
	@Post()
	async create(@Body() dto: CreateUserDto) {
		try {
			const createdUser = await this.usersService.createUser(dto);
			return createdUser;
		} catch (error) {
			throw new InternalServerErrorException("Error while creating user");
		}
	}
}
