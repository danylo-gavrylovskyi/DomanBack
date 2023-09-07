import { UseGuards, applyDecorators } from "@nestjs/common/decorators/core";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { OnlyAdminGuard } from "../guards/admin.guard";

export const Auth = (role: "user" | "admin" = "user") =>
	applyDecorators(
		role === "admin" ? UseGuards(JwtAuthGuard, OnlyAdminGuard) : UseGuards(JwtAuthGuard)
	);
