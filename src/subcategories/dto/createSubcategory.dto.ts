import { ApiProperty } from "@nestjs/swagger";

export class CreateSubcategoryDto {
	@ApiProperty({ example: "ЗМІШУВАЧІ", description: "Category title" })
	readonly title: string;

	@ApiProperty({ example: "zmishyvachi", description: "Subcategory slug" })
	slug: string;

	@ApiProperty({
		example: "62771c51-3b8b-453a-9aca-2cb439c0b5b6.jpg",
		description: "Category image",
	})
	readonly image: string;

	@ApiProperty({ example: 1, description: "To which category this subcategory belongs to" })
	readonly categoryId: number;
}
