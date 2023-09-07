import { Module } from "@nestjs/common";
import { AttributesController } from "./attributes.controller";
import { AttributesService } from "./attributes.service";
import { SequelizeModule } from "@nestjs/sequelize";

import { Attribute } from "./attribute.model";
import { Product } from "src/products/product.model";
import { ProductAttribute } from "src/product-attribute/product-attribute.model";

@Module({
	controllers: [AttributesController],
	providers: [AttributesService],
	imports: [SequelizeModule.forFeature([Attribute, Product, ProductAttribute])],
})
export class AttributesModule {}
