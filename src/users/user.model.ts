import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttr {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({ example: "Вася", description: "User's first name" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	firstName: string;

	@ApiProperty({ example: "Пупкін", description: "User's last name" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: false,
	})
	lastName: string;

	@ApiProperty({ example: "Вася", description: "User's first name" })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false,
	})
	phoneNumber: string;

	@ApiProperty({ example: "vasya.pupkin@gmail.com", description: "User's e-mail" })
	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: true,
	})
	email: string;

	@ApiProperty({ example: "vasyaPup116!", description: "User's password" })
	@Column({
		type: DataType.STRING,
		unique: false,
		allowNull: true,
	})
	password: string;

	@ApiProperty({ example: true, description: "Wheather this user is admin" })
	@Column({
		type: DataType.BOOLEAN,
		unique: false,
		allowNull: false,
		defaultValue: false,
	})
	isAdmin: boolean;
}
