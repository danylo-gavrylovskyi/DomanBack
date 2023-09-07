import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";
import { SequelizeModule } from "@nestjs/sequelize";

import { Category } from "./category.model";
import { Subcategory } from "src/subcategories/subcategory.model";

@Module({
	controllers: [CategoriesController],
	providers: [CategoriesService],
	imports: [SequelizeModule.forFeature([Category, Subcategory])],
})
export class CategoriesModule {}
