import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { OrderProduct } from "src/order-product/order-product.model";

interface OrderCreationAttr {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	totalPrice: number;
}

@Table({ tableName: "orders" })
export class Order extends Model<Order, OrderCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: "Vasya", description: "Cutomer first name" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	firstName: string;

	@ApiProperty({ example: "Pupkin", description: "Cutomer last name" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	lastName: string;

	@ApiProperty({ example: "v.pup@gmail.com", description: "Cutomer e-mail" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	email: string;

	@ApiProperty({ example: "0638882222", description: "Cutomer phone number" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	phoneNumber: string;

	@ApiProperty({ example: 1200, description: "Order total price" })
	@Column({
		type: DataType.INTEGER,
		unique: false,
		allowNull: false,
	})
	totalPrice: number;

	@HasMany(() => OrderProduct)
	orderProducts: OrderProduct[];
}
