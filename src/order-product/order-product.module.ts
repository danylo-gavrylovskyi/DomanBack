import { Module } from "@nestjs/common";
import { OrderProductService } from "./order-product.service";
import { OrderProductController } from "./order-product.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderProduct } from "./order-product.model";

@Module({
	controllers: [OrderProductController],
	providers: [OrderProductService],
	imports: [SequelizeModule.forFeature([OrderProduct])],
	exports: [OrderProductService],
})
export class OrderProductModule {}
