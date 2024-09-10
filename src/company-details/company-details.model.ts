import { ApiProperty } from "@nestjs/swagger";
import { Model, Column, Table, DataType } from "sequelize-typescript";

interface CompanyDetailsCreationAttr {
	payment_and_delivery_content: string;
	returns_and_exchanges_content: string;
	about_company_content: string;
	phone_number1: string;
	phone_number2: string;
	email: string;
	adress: string;
	facebook_link: string;
	instagram_link: string;
}

@Table({ tableName: "company_details" })
export class CompanyDetails extends Model<CompanyDetails, CompanyDetailsCreationAttr> {
	@ApiProperty({ example: 1, description: "Unique identifier" })
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
		allowNull: false,
	})
	id: number;

	@ApiProperty({
		example: "Інформація про оплату та доставку",
		description: "Text that will be on the 'Payment and Delivery' page",
	})
	@Column({ type: DataType.TEXT, unique: false })
	payment_and_delivery_content: string;

	@ApiProperty({
		example: "Інформація про повернення та обмін товару",
		description: "Text that will be on the 'Returns and Exchanges' page",
	})
	@Column({ type: DataType.TEXT, unique: false })
	returns_and_exchanges_content: string;

	@ApiProperty({
		example: "Інформація про компанію",
		description: "Text that will be on the 'About the Company' page",
	})
	@Column({ type: DataType.TEXT, unique: false })
	about_company_content: string;

	@ApiProperty({
		example: "068 000 0000",
		description: "Company phone number 1",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	phone_number1: string;

	@ApiProperty({
		example: "093 111 1111",
		description: "Company phone number 2",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	phone_number2: string;

	@ApiProperty({
		example: "company@gmail.com",
		description: "Company e-mail",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	email: string;

	@ApiProperty({
		example: "Київська 12, Житомир, Житомирська обл.",
		description: "Company adress",
	})
	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	adress: string;

	@ApiProperty({
		example: "https://www.facebook.com/company",
		description: "Link to company facebook page",
	})
	@Column({ type: DataType.STRING, unique: true })
	facebook_link: string;

	@ApiProperty({
		example: "https://www.instagram.com/company",
		description: "Link to company instagram page",
	})
	@Column({ type: DataType.STRING, unique: true })
	instagram_link: string;
}
