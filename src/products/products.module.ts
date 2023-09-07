import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Product } from "./product.model";
import { Subcategory } from "src/subcategories/subcategory.model";
import { ProductAttribute } from "src/product-attribute/product-attribute.model";
import { ProductAttributeService } from "src/product-attribute/product-attribute.service";

@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductAttributeService],
	imports: [SequelizeModule.forFeature([Product, Subcategory, ProductAttribute])],
})
export class ProductsModule {}
