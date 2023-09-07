import { Body, Controller, Post, InternalServerErrorException } from "@nestjs/common";
import { CreateProductAttributeDto } from "./dto/CreateProductAttribute.dto";
import { ProductAttributeService } from "./product-attribute.service";

@Controller("product-attribute")
export class ProductAttributeController {
	constructor(private productAttributeService: ProductAttributeService) {}

	@Post()
	async add(@Body() dto: CreateProductAttributeDto) {
		try {
			const productAttribute = await this.productAttributeService.addProductAttribute(dto);
			return productAttribute;
		} catch (error) {
			throw new InternalServerErrorException("Error while adding product attribute");
		}
	}
}
