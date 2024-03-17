import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { Order } from "src/orders/order.model";
import { Product } from "src/products/product.model";

interface OrderProductCreationAttr {
	orderId: number;
	productId: number;
	quantity: number;
}

@Table({ tableName: "order-product" })
export class OrderProduct extends Model<OrderProduct, OrderProductCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: 1, description: "Order Id" })
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	@ForeignKey(() => Order)
	orderId: number;

	@ApiProperty({ example: 1, description: "Product Id" })
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	@ForeignKey(() => Product)
	productId: number;

	@ApiProperty({ example: 3, description: "Bought product quantity" })
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	quantity: number;

	@BelongsTo(() => Order, "orderId")
	order: Order;

	@BelongsTo(() => Product)
	product: Product;
}
