import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class AuthDto {
	@IsString()
	readonly firstName: string;
	@IsString()
	readonly lastName: string;
	@Length(10, 10)
	@IsString()
	readonly phoneNumber: string;
	@IsString()
	@IsEmail()
	readonly email: string;
	@MinLength(6, { message: "Довжина паролю має бути щонайменше 6 символів" })
	@IsString()
	readonly password: string;
}
