import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";

import { Category } from "src/categories/category.model";
import { Product } from "src/products/product.model";

interface SubcategoryCreationAttr {
	title: string;
	slug: string;
	image: string;
	categoryId: number;
}

@Table({ tableName: "subcategories" })
export class Subcategory extends Model<Subcategory, SubcategoryCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: "ЗМІШУВАЧІ", description: "Subcategory title" })
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	title: string;

	@ApiProperty({ example: "zmishyvachi", description: "Subcategory slug" })
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	slug: string;

	@ApiProperty({
		example: "62771c51-3b8b-453a-9aca-2cb439c0b5b6.jpg",
		description: "Subcategory image",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	image: string;

	@ApiProperty({ example: "1", description: "To which category this subcategory belongs to" })
	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER, allowNull: false, unique: false })
	categoryId: number;

	@BelongsTo(() => Category)
	category: Category;

	@HasMany(() => Product)
	products: Product[];
}
