import { ApiProperty } from "@nestjs/swagger";

type AttributeIdValuePair = [categoryId: number, value: string];

export class CreateProductControllerDto {
	@ApiProperty({ example: "12343afdf232", description: "Product article" })
	readonly article: string;

	@ApiProperty({ example: "smesitel-dlya-kuhni", description: "Product slug" })
	readonly slug: string;

	@ApiProperty({
		example: "Радіатори виготовлені з холоднокатної сталі товщиною 1,5 мм",
		description: "Product description",
	})
	readonly description: string;

	@ApiProperty({ example: "КОТЕЛ ТВЕРДОПАЛИВНИЙ EDELMET 33 КВТ", description: "Product name" })
	readonly title: string;

	@ApiProperty({ example: 264, description: "Product quantity" })
	readonly quantity: number;

	@ApiProperty({ example: 1289, description: "Product price" })
	readonly price: number;

	@ApiProperty({ example: 1, description: "To which subcategory this product belongs to" })
	readonly subcategoryId: number;

	readonly attributeValues: AttributeIdValuePair[];
}
