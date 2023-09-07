import { ApiProperty } from "@nestjs/swagger";
import { AttributeIdValuePair } from "types/attribute-value-pair.interface";

export class UpdateProductControllerDto {
	@ApiProperty({ example: "12343afdf232", description: "Product article" })
	readonly article?: string;

	@ApiProperty({ example: "КОТЕЛ ТВЕРДОПАЛИВНИЙ EDELMET 33 КВТ", description: "Product name" })
	readonly title?: string;

	@ApiProperty({ example: 264, description: "Product quantity" })
	readonly quantity?: number;

	@ApiProperty({ example: 1289, description: "Product price" })
	readonly price?: number;

	@ApiProperty({ example: 1, description: "To which subcategory this product belongs to" })
	readonly subcategoryId?: number;

	readonly oldAttributeValues?: AttributeIdValuePair[];

	readonly newAttributeValues?: AttributeIdValuePair[];
}

export class UpdateProductServiceDto extends UpdateProductControllerDto {
	@ApiProperty({
		example: "62771c51-3b8b-453a-9aca-2cb439c0b5b6.jpg",
		description: "Product image",
	})
	readonly image?: string;
}
