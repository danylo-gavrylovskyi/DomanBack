import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
	Body,
	Controller,
	Get,
	Post,
	HttpException,
	HttpStatus,
	Param,
	UseInterceptors,
	UploadedFile,
	Delete,
	Patch,
	Query,
	InternalServerErrorException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { CategoriesService } from "./categories.service";

import { PaginationDto } from "src/products/dto/pagination.dto";

import { Category } from "./category.model";
import { Subcategory } from "src/subcategories/subcategory.model";

import { imageStorage } from "utils/imageStorage";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
	constructor(private categoriesService: CategoriesService) {}

	@ApiOperation({ summary: "Getting all categories" })
	@ApiResponse({ type: [Category] })
	@Get()
	async getAll() {
		try {
			const categories = await this.categoriesService.getAllCategories();
			return categories;
		} catch (error) {
			throw new HttpException(
				"Error while fetching categories",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ description: "Getting all categories with pagination" })
	@ApiResponse({ type: [Category] })
	@Get("/pagination")
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const categories = await this.categoriesService.getCategoriesWithPagination(queryParams);
			return categories;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error while fetching all categories with pagination"
			);
		}
	}

	@ApiOperation({ summary: "Adding category" })
	@ApiResponse({ type: Category })
	@Post()
	@UseInterceptors(FileInterceptor("image", imageStorage("categoriesImages")))
	async add(
		@Body() dto: { title: string; slug: string },
		@UploadedFile() file: Express.Multer.File
	) {
		try {
			const category = await this.categoriesService.addCategory({
				...dto,
				image: file.filename,
			});
			return category;
		} catch (error) {
			throw new HttpException("Error while adding category", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation({ summary: "Getting this category subcategories" })
	@ApiResponse({ type: [Subcategory] })
	@Get("/:id/subcategories")
	async getCategorySubcategories(@Param("id") categoryId: number) {
		try {
			const subcategories = await this.categoriesService.getSubcategories(categoryId);
			return subcategories;
		} catch (error) {
			throw new HttpException(
				"Error while getting this category subcategories",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ summary: "Deleting category" })
	@ApiResponse({ type: Number })
	@Delete("/:id")
	async delete(@Param("id") categoryId: number) {
		try {
			await this.categoriesService.deleteCategory(categoryId);
			return categoryId;
		} catch (error) {
			throw new HttpException("Error while deleting category", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation({ summary: "Edit category" })
	@ApiResponse({ type: Category })
	@Patch("/:id")
	@UseInterceptors(FileInterceptor("image", imageStorage("categoriesImages")))
	async edit(
		@Param("id") categoryId: number,
		@Body() dto: { title: string },
		@UploadedFile() file?: Express.Multer.File
	) {
		try {
			if (file) {
				const updatedCategory = await this.categoriesService.editCategory(categoryId, {
					...dto,
					image: file.filename,
				});
				return updatedCategory;
			}
			const updatedCategory = await this.categoriesService.editCategory(categoryId, { ...dto });
			return updatedCategory;
		} catch (error) {
			throw new HttpException("Error while editing category", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
