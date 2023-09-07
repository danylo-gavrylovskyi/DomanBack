import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import * as express from "express";
import * as path from "path";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
	const PORT = process.env.PORT || 4000;
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));
	console.log("Static file directory:", path.join(__dirname, "..", "..", "uploads"));

	const config = new DocumentBuilder().setTitle("Doman").build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/api/docs", app, document);

	app.use(
		session({
			secret: process.env.PRIVATE_KEY,
			resave: false,
			saveUninitialized: false,
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
