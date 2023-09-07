import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, Table, DataType, BelongsToMany } from "sequelize-typescript";

import { ProductAttribute } from "src/product-attribute/product-attribute.model";
import { Product } from "src/products/product.model";

interface AttributeCreationAttr {
	title: string;
}

@Table({ tableName: "attributes" })
export class Attribute extends Model<Attribute, AttributeCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: "Виробник", description: "Attribute name" })
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	title: string;

	@BelongsToMany(() => Product, () => ProductAttribute)
	products: Product[];
}
