import {
	Body,
	Controller,
	Get,
	Post,
	UploadedFile,
	UseInterceptors,
	InternalServerErrorException,
	Delete,
	Param,
	Patch,
	Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { FindOptions } from "sequelize";

import { ProductsService } from "./products.service";
import { ProductAttributeService } from "src/product-attribute/product-attribute.service";

import { Product } from "./product.model";

import { imageStorage } from "utils/imageStorage";

import { AttributeIdValuePair } from "types/attribute-value-pair.interface";

import { UpdateProductControllerDto } from "./dto/updateProduct.dto";
import { CreateProductControllerDto } from "./dto/createProductController.dto";
import { PaginationDto } from "./dto/pagination.dto";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
	constructor(
		private productsService: ProductsService,
		private productAttributeService: ProductAttributeService
	) {}

	@ApiOperation({ description: "Getting all products" })
	@ApiResponse({ type: [Product] })
	@Get("/admin")
	async getAll(@Query() findOptions: FindOptions<Product>) {
		try {
			const products = await this.productsService.getAllProducts(findOptions);
			return products;
		} catch (error) {
			throw new InternalServerErrorException("Error while fetching all products");
		}
	}

	@ApiOperation({ description: "Getting all products with pagination" })
	@ApiResponse({ type: [Product] })
	@Get()
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const products = await this.productsService.getProductsWithPagination(queryParams);
			return products;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error while fetching all products with pagination"
			);
		}
	}

	@ApiOperation({ description: "Adding product" })
	@ApiResponse({ type: Product })
	@UseInterceptors(FileInterceptor("image", imageStorage("productsImages")))
	@Post()
	async add(@Body() dto: CreateProductControllerDto, @UploadedFile() image: Express.Multer.File) {
		try {
			let { attributeValues } = dto;
			attributeValues = JSON.parse(String(attributeValues));

			const product = await this.productsService.addProduct({ ...dto, image: image.filename });

			attributeValues.forEach((value) => {
				this.productAttributeService.addProductAttribute({
					productId: product.id,
					attributeId: value[0],
					attributeValue: value[1],
				});
			});
			return product;
		} catch (error) {
			throw new InternalServerErrorException("Error while adding product");
		}
	}

	@ApiOperation({ description: "Adding products from excel table" })
	@ApiResponse({ type: [Product] })
	@UseInterceptors(FileInterceptor("file", imageStorage("excel")))
	@Post("/excel")
	async loadProductsFromTable(@UploadedFile() file: Express.Multer.File) {
		try {
			const products: Product[] = await this.productsService.loadProductsViaExcel(file.filename);
			return products;
		} catch (error) {
			throw new InternalServerErrorException("Error while adding product from table");
		}
	}

	@ApiOperation({ description: "Deleting product" })
	@ApiResponse({ type: Number })
	@Delete("/:id")
	async delete(@Param("id") productId: number) {
		try {
			await this.productsService.deleteProduct(productId);
			return productId;
		} catch (error) {
			throw new InternalServerErrorException("Error while deleting product");
		}
	}

	@ApiOperation({ description: "Updating product" })
	@ApiResponse({ type: Product })
	@UseInterceptors(FileInterceptor("image", imageStorage("productsImages")))
	@Patch("/:id")
	async update(
		@Param("id") productId: number,
		@Body() dto: UpdateProductControllerDto,
		@UploadedFile() image: Express.Multer.File
	) {
		try {
			let { oldAttributeValues, newAttributeValues } = dto;
			let product: Product;

			if (image) {
				product = await this.productsService.updateProduct(productId, {
					...dto,
					image: image.filename,
				});
			} else {
				product = await this.productsService.updateProduct(productId, {
					...dto,
				});
			}

			if (oldAttributeValues) {
				JSON.parse(String(oldAttributeValues)).forEach((value: AttributeIdValuePair) => {
					this.productAttributeService.updateProductAttribute(productId, value[0], value[1]);
				});
			}

			if (newAttributeValues) {
				JSON.parse(String(newAttributeValues)).forEach((value: AttributeIdValuePair) => {
					this.productAttributeService.addProductAttribute({
						productId: product.id,
						attributeId: value[0],
						attributeValue: value[1],
					});
				});
			}
			return product;
		} catch (error) {
			throw new InternalServerErrorException("Error while editing product");
		}
	}
}
