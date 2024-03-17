import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { OrderProduct } from "./order-product.model";

import { CreateOrderProductDto } from "./createOrder-product.dto";

@Injectable()
export class OrderProductService {
	constructor(@InjectModel(OrderProduct) private orderProductRepo: typeof OrderProduct) {}

	createOrderProduct(dto: CreateOrderProductDto) {
		return this.orderProductRepo.create(dto);
	}
}
