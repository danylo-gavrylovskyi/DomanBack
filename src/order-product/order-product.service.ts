import { Injectable } from "@nestjs/common";
import { CreateOrderProductDto } from "./createOrder-product.dto";
import { InjectModel } from "@nestjs/sequelize";
import { OrderProduct } from "./order-product.model";

@Injectable()
export class OrderProductService {
	constructor(@InjectModel(OrderProduct) private orderProductRepo: typeof OrderProduct) {}

	createOrderProduct(dto: CreateOrderProductDto) {
		return this.orderProductRepo.create(dto);
	}
}
