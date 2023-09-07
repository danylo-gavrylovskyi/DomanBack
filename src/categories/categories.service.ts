import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Category } from "./category.model";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import { Subcategory } from "src/subcategories/subcategory.model";
import { EditCategoryDto } from "./dto/editCategory.dto";
import { deleteImage } from "utils/deleteImage";

@Injectable()
export class CategoriesService {
	constructor(
		@InjectModel(Category) private categoryRepository: typeof Category,
		@InjectModel(Subcategory) private subcategoryRepository: typeof Subcategory
	) {}

	getAllCategories() {
		return this.categoryRepository.findAll({ include: { all: true } });
	}

	addCategory(dto: CreateCategoryDto) {
		return this.categoryRepository.create(dto);
	}

	getSubcategories(id: number) {
		return this.subcategoryRepository.findAll({ where: { categoryId: id } });
	}

	async deleteCategory(id: number) {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new HttpException("Error while deleting category", HttpStatus.NOT_FOUND);
		}
		deleteImage("categoriesImages", category.image);
		return this.categoryRepository.destroy({ where: { id } });
	}

	async editCategory(id: number, dto: EditCategoryDto) {
		const category = await this.categoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new HttpException("Error while editing category", HttpStatus.NOT_FOUND);
		}
		if (dto.image) {
			deleteImage("categoriesImages", category.image);
		}
		await this.categoryRepository.update(dto, { where: { id } });
		return this.categoryRepository.findOne({ where: { id } });
	}
}
