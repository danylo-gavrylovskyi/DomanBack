import { Injectable } from "@nestjs/common";
import { CreateProductAttributeDto } from "./dto/CreateProductAttribute.dto";
import { InjectModel } from "@nestjs/sequelize";
import { ProductAttribute } from "./product-attribute.model";

@Injectable()
export class ProductAttributeService {
	constructor(
		@InjectModel(ProductAttribute) private productAttributeRepo: typeof ProductAttribute
	) {}

	addProductAttribute(dto: CreateProductAttributeDto) {
		return this.productAttributeRepo.create(dto);
	}

	updateProductAttribute(productId: number, attributeId: number, attributeValue: string) {
		return this.productAttributeRepo.update(
			{ attributeValue },
			{ where: { productId, attributeId } }
		);
	}
}
