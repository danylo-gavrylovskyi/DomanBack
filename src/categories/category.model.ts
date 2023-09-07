import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Subcategory } from "src/subcategories/subcategory.model";

interface CategoryCreationAttr {
	title: string;
	image: string;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: "ЗМІШУВАЧІ", description: "Category title" })
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	title: string;

	@ApiProperty({
		example: "62771c51-3b8b-453a-9aca-2cb439c0b5b6.jpg",
		description: "Category image",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	image: string;

	@HasMany(() => Subcategory)
	subcategories: Subcategory[];
}
