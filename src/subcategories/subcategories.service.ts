import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as fs from "fs";
import * as path from "path";

import { Subcategory } from "./subcategory.model";

import { CreateSubcategoryDto } from "./dto/createSubcategory.dto";
import { PaginationDto } from "src/products/dto/pagination.dto";

@Injectable()
export class SubcategoriesService {
	constructor(@InjectModel(Subcategory) private subcategoryRepository: typeof Subcategory) {}

	getAllSubcategories() {
		return this.subcategoryRepository.findAll({ include: { all: true } });
	}

	getSubcategoriesWithPagination({ page = "1", perPage = "4", inputValue = "" }: PaginationDto) {
		return this.subcategoryRepository.findAndCountAll({
			limit: +perPage,
			offset: (+page - 1) * +perPage,
			include: { all: true },
		});
	}

	addSubcategory(dto: CreateSubcategoryDto) {
		return this.subcategoryRepository.create(dto);
	}

	async deleteCategory(id: number) {
		const category = await this.subcategoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new HttpException("Error while deleting category", HttpStatus.NOT_FOUND);
		}
		fs.unlink(
			path.join(__dirname, "..", "..", "..", "uploads", "categoriesImages", category.image),
			(err) => {
				if (err)
					throw new HttpException(
						"Error while deleting image from folder",
						HttpStatus.INTERNAL_SERVER_ERROR
					);
			}
		);
		return this.subcategoryRepository.destroy({ where: { id } });
	}

	async editCategory(id: number, dto) {
		const category = await this.subcategoryRepository.findOne({ where: { id } });
		if (!category) {
			throw new HttpException("Error while editing category", HttpStatus.NOT_FOUND);
		}
		if (dto.image) {
			fs.unlink(
				path.join(__dirname, "..", "..", "..", "uploads", "categoriesImages", category.image),
				(err) => {
					if (err)
						throw new HttpException(
							"Error while deleting image from folder",
							HttpStatus.INTERNAL_SERVER_ERROR
						);
				}
			);
		}
		await this.subcategoryRepository.update(dto, { where: { id } });
		return this.subcategoryRepository.findOne({ where: { id } });
	}
}
