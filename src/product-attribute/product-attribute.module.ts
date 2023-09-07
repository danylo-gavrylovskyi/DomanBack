import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { ProductAttribute } from "./product-attribute.model";
import { Attribute } from "src/attributes/attribute.model";
import { Product } from "src/products/product.model";
import { ProductAttributeService } from "./product-attribute.service";
import { ProductAttributeController } from "./product-attribute.controller";

@Module({
	imports: [SequelizeModule.forFeature([ProductAttribute, Attribute, Product])],
	providers: [ProductAttributeService],
	controllers: [ProductAttributeController],
	exports: [ProductAttributeService],
})
export class ProductAttributeModule {}
