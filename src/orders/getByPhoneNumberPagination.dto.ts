import { PaginationDto } from "src/products/dto/pagination.dto";

export class GetByPhoneNumberPaginationDto extends PaginationDto {
	readonly phoneNumber: string;
}
