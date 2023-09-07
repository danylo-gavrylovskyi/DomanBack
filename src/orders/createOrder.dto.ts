import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { OrderedProduct } from "types/ordered-product.interface";

export class CreateOrderDto {
	@IsString()
	readonly firstName: string;

	@IsString()
	readonly lastName: string;

	@IsEmail()
	readonly email: string;

	@IsString()
	@Length(10, 10)
	readonly phoneNumber: string;

	readonly orderedProducts: OrderedProduct[];

	@IsNumber()
	readonly totalPrice: number;
}
