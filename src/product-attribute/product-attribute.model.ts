import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Attribute } from "src/attributes/attribute.model";
import { Product } from "src/products/product.model";

interface ProductAttributeCreationAttr {
	attributeValue: string;
}

@Table({ tableName: "product-attributes" })
export class ProductAttribute extends Model<ProductAttribute, ProductAttributeCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER, unique: false, allowNull: false })
	productId: number;

	@ForeignKey(() => Attribute)
	@Column({ type: DataType.INTEGER, unique: false, allowNull: false })
	attributeId: number;

	@Column({ type: DataType.STRING, unique: false, allowNull: false })
	attributeValue: string;
}
