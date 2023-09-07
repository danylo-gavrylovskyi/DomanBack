import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
	@IsString()
	readonly firstName: string;
	@IsString()
	readonly lastName: string;
	@IsString()
	@Length(10, 10)
	readonly phoneNumber: string;
	@IsOptional()
	@IsEmail()
	readonly email?: string;
	@IsOptional()
	@IsString()
	readonly password?: string;
}
