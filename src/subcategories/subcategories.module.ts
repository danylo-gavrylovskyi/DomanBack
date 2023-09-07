import { Module } from "@nestjs/common";
import { SubcategoriesController } from "./subcategories.controller";
import { SubcategoriesService } from "./subcategories.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Subcategory } from "./subcategory.model";
import { Category } from "src/categories/category.model";
import { Product } from "src/products/product.model";

@Module({
	controllers: [SubcategoriesController],
	providers: [SubcategoriesService],
	imports: [SequelizeModule.forFeature([Subcategory, Category, Product])],
})
export class SubcategoriesModule {}
