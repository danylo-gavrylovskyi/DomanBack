import { ApiProperty } from "@nestjs/swagger";

export class CreateAttributeDto {
	@ApiProperty({ example: "Виробник", description: "Attribute name" })
	readonly title: string;
}
