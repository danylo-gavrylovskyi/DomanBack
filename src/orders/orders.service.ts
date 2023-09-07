import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { CreateOrderDto } from "./createOrder.dto";
import { OrderProductService } from "src/order-product/order-product.service";

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
}
