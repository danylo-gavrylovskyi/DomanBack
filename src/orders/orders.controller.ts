import {
	Body,
	Controller,
	Get,
	InternalServerErrorException,
	Param,
	Post,
	Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { OrdersService } from "./orders.service";

import { Order } from "./order.model";

import { CreateOrderDto } from "./createOrder.dto";
import { PaginationDto } from "src/products/dto/pagination.dto";
import { GetByPhoneNumberPaginationDto } from "./getByPhoneNumberPagination.dto";

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

	@ApiOperation({ description: "Getting all orders with pagination" })
	@ApiResponse({ type: Order })
	@Get()
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const orders = await this.ordersService.getOrdersWithPagination(queryParams);
			return orders;
		} catch (error) {
			throw new InternalServerErrorException("Error while getting orders with pagination");
		}
	}

	@ApiOperation({ description: "Getting orders by phone number with pagination" })
	@ApiResponse({ type: Order })
	@Get("/:phoneNumber")
	async getByPhoneNumberPagination(
		@Query() queryParams: PaginationDto,
		@Param("phoneNumber") phoneNumber: string
	) {
		try {
			const orders = await this.ordersService.getOrdersByPhoneNumberPagination({
				...queryParams,
				phoneNumber,
			});
			return orders;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error while getting orders by phone number with pagination"
			);
		}
	}
}
