import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Product } from "./product.model";

import { CreateProductServiceDto } from "./dto/createProductService.dto";
import { UpdateProductServiceDto } from "./dto/updateProduct.dto";
import { deleteImage } from "utils/deleteImage";

@Injectable()
export class ProductsService {
	constructor(@InjectModel(Product) private productsRepository: typeof Product) {}

	getAllProducts() {
		return this.productsRepository.findAll({ include: { all: true } });
	}

	addProduct(dto: CreateProductServiceDto) {
		return this.productsRepository.create(dto);
	}

	async deleteProduct(id: number) {
		const product = await this.productsRepository.findOne({ where: { id } });
		deleteImage("productsImages", product.image);
		return this.productsRepository.destroy({ where: { id } });
	}

	async updateProduct(id: number, dto: UpdateProductServiceDto) {
		const product = await this.productsRepository.findOne({ where: { id } });
		if (dto.image) {
			deleteImage("productsImages", product.image);
		}
		await this.productsRepository.update(dto, { where: { id } });
		return this.productsRepository.findOne({ where: { id } });
	}
}
