import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { OrderProductService } from "src/order-product/order-product.service";

import { Order } from "./order.model";
import { Product } from "src/products/product.model";
import { OrderProduct } from "src/order-product/order-product.model";

import { CreateOrderDto } from "./createOrder.dto";
import { PaginationDto } from "src/products/dto/pagination.dto";

@Injectable()
export class OrdersService {
	constructor(
		@InjectModel(Order) private ordersRepository: typeof Order,
		private orderProductService: OrderProductService
	) {}

	async createOrder(dto: CreateOrderDto) {
		const { orderedProducts } = dto;

		const order: Order = await this.ordersRepository.create(dto);

		orderedProducts.forEach(async (obj) => {
			await this.orderProductService.createOrderProduct({
				orderId: order.id,
				productId: obj.product.id,
				quantity: obj.quantity,
			});
		});

		return order;
	}

	async getOrdersWithPagination({ page = "1", perPage = "10" }: PaginationDto) {
		return this.ordersRepository.findAndCountAll({
			limit: +perPage,
			offset: (+page - 1) * +perPage,
			include: [
				{
					model: OrderProduct, // Include the OrderProduct model
					include: [
						{
							model: Product, // Include the associated Product model
						},
					],
				},
			],
		});
	}
}
