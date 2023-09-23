import { IsOptional } from "class-validator";

export class PaginationDto {
	@IsOptional()
	readonly page?: string;

	@IsOptional()
	readonly perPage?: string;
}
