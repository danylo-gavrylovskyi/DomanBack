import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { ProductsModule } from "./products/products.module";
import { CategoriesModule } from "./categories/categories.module";
import { SubcategoriesModule } from "./subcategories/subcategories.module";
import { AttributesModule } from "./attributes/attributes.module";
import { ConfigModule } from "@nestjs/config";
import { Product } from "./products/product.model";
import { Category } from "./categories/category.model";
import { Subcategory } from "./subcategories/subcategory.model";
import { Attribute } from "./attributes/attribute.model";
import { ProductAttributeModule } from "./product-attribute/product-attribute.module";
import { ProductAttribute } from "./product-attribute/product-attribute.model";
import { BannersModule } from './banners/banners.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderProductModule } from './order-product/order-product.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ".env",
		}),
		SequelizeModule.forRoot({
			dialect: "postgres",
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USERNAME,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [Product, Category, Subcategory, Attribute, ProductAttribute],
			autoLoadModels: true,
		}),
		ProductsModule,
		CategoriesModule,
		SubcategoriesModule,
		AttributesModule,
		ProductAttributeModule,
		BannersModule,
		UsersModule,
		OrdersModule,
		OrderProductModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
