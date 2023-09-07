import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { OrderProductModule } from "src/order-product/order-product.module";

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [SequelizeModule.forFeature([Order]), OrderProductModule],
})
export class OrdersModule {}
