import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Param,
	Post,
	Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AttributesService } from "./attributes.service";

import { Attribute } from "./attribute.model";

import { PaginationDto } from "src/products/dto/pagination.dto";

@ApiTags("Attributes")
@Controller("attributes")
export class AttributesController {
	constructor(private attributesService: AttributesService) {}

	@ApiOperation({ description: "Getting all attributes" })
	@ApiResponse({ type: [Attribute] })
	@Get()
	async getAll() {
		try {
			const attributes = await this.attributesService.getAllAttributes();
			return attributes;
		} catch (error) {
			throw new HttpException(
				"Error while getting all attributes",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ description: "Getting all attributes with pagination" })
	@ApiResponse({ type: [Attribute] })
	@Get("/pagination")
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const attributes = await this.attributesService.getAttributesWithPagination(queryParams);
			return attributes;
		} catch (error) {
			throw new InternalServerErrorException(
				"Error while fetching all attributes with pagination"
			);
		}
	}

	@ApiOperation({ description: "Adding new attribute" })
	@ApiResponse({ type: Attribute })
	@Post()
	async add(@Body() title: string) {
		try {
			const attribute = await this.attributesService.addAttribute(title);
			return attribute;
		} catch (error) {
			throw new HttpException("Error while adding attribute", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@ApiOperation({ description: "Deleting attribute" })
	@ApiResponse({ type: Number })
	@Delete("/:id")
	async delete(@Param() dto: { id: number }) {
		try {
			await this.attributesService.deleteAttribute(dto.id);
			return dto.id;
		} catch (error) {
			console.log(error);
			throw new HttpException(
				"Error while deleting attribute",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
