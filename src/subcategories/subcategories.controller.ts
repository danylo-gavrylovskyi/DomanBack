import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { SubcategoriesService } from "./subcategories.service";

import { Subcategory } from "./subcategory.model";

import { CreateSubcategoryDto } from "./dto/createSubcategory.dto";
import { PaginationDto } from "src/products/dto/pagination.dto";

import { imageStorage } from "utils/imageStorage";

@ApiTags("Subcategories")
@Controller("subcategories")
export class SubcategoriesController {
	constructor(private subcategoriesService: SubcategoriesService) {}

	@ApiOperation({ summary: "Getting all subcategories" })
	@ApiResponse({ type: [Subcategory] })
	@Get()
	async getAll() {
		try {
			const subcategories = await this.subcategoriesService.getAllSubcategories();
			return subcategories;
		} catch (error) {
			throw new HttpException(
				"Error while fetching subcategories",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ description: "Getting all subcategories with pagination" })
	@ApiResponse({ type: [Subcategory] })
	@Get("/pagination")
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const subcategories = await this.subcategoriesService.getSubcategoriesWithPagination(
				queryParams
			);
			return subcategories;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error while fetching all subcategories with pagination"
			);
		}
	}

	@ApiOperation({ summary: "Adding subcategory" })
	@ApiResponse({ type: Subcategory })
	@Post()
	@UseInterceptors(FileInterceptor("image", imageStorage("subcategoriesImages")))
	async add(@Body() dto: CreateSubcategoryDto, @UploadedFile() file: Express.Multer.File) {
		try {
			const category = await this.subcategoriesService.addSubcategory({
				...dto,
				image: file.filename,
			});
			return category;
		} catch (error) {
			throw new HttpException(
				"Error while adding subcategory",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ summary: "Deleting category" })
	@ApiResponse({ type: Number })
	@Delete("/:id")
	async delete(@Param("id") categoryId: number) {
		try {
			await this.subcategoriesService.deleteCategory(categoryId);
			return categoryId;
		} catch (error) {
			throw new HttpException("Error while deleting category", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation({ summary: "Edit category" })
	@ApiResponse({ type: Subcategory })
	@Patch("/:id")
	@UseInterceptors(FileInterceptor("image", imageStorage("subcategoriesImages")))
	async edit(
		@Param("id") categoryId: number,
		@Body() dto: { title: string },
		@UploadedFile() file?: Express.Multer.File
	) {
		try {
			if (file) {
				const updatedCategory = await this.subcategoriesService.editCategory(categoryId, {
					...dto,
					image: file.filename,
				});
				return updatedCategory;
			}
			const updatedCategory = await this.subcategoriesService.editCategory(categoryId, {
				...dto,
			});
			return updatedCategory;
		} catch (error) {
			throw new HttpException("Error while editing category", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
