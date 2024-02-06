import {
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	Param,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

import { BannersService } from "./banners.service";
import { imageStorage } from "utils/imageStorage";
import { PaginationDto } from "src/products/dto/pagination.dto";

@Controller("banners")
export class BannersController {
	constructor(private bannersService: BannersService) {}

	@ApiOperation({ summary: "Getting all banners" })
	@ApiResponse({ type: [String] })
	@Get()
	async getAll() {
		try {
			const banners = await this.bannersService.getAllBanners();
			return banners;
		} catch (error) {
			throw new HttpException(
				"Error while getting all banners",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}

	@ApiOperation({ description: "Getting all banners with pagination" })
	@ApiResponse({ type: [String] })
	@Get("/pagination")
	async getAllWithPagination(@Query() queryParams: PaginationDto) {
		try {
			const banners = await this.bannersService.getBannersWithPagination(queryParams);
			return banners;
		} catch (error) {
			throw new InternalServerErrorException("Error while fetching all banners with pagination");
		}
	}

	@ApiOperation({ summary: "Adding banner" })
	@ApiResponse({ type: String })
	@Post()
	@UseInterceptors(FileInterceptor("banner", imageStorage("banners")))
	add(@UploadedFile() banner: Express.Multer.File) {
		return banner.filename;
	}

	@ApiOperation({ summary: "Deleting banner" })
	@ApiResponse({ type: String })
	@Delete("/:bannerUrl")
	delete(@Param("bannerUrl") bannerUrl: string) {
		this.bannersService.deleteBanner(bannerUrl);
		return bannerUrl;
	}
}
