import { Body, Controller, InternalServerErrorException, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Order } from "./order.model";
import { CreateOrderDto } from "./createOrder.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@ApiOperation({ description: "Creating order" })
	@ApiResponse({ type: Order })
	@Post()
	async create(@Body() dto: CreateOrderDto) {
		try {
			const order = await this.ordersService.createOrder(dto);
			return order;
		} catch (error) {
			throw new InternalServerErrorException("Error while creating order");
		}
	}
}
