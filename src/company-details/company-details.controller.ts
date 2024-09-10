import { Body, Controller, Get, InternalServerErrorException, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

import { CompanyDetailsService } from "./company-details.service";
import { CompanyDetails } from "./company-details.model";

import { UpdateCompanyDetailsDto } from "./dto/updateCompanyDetails.dto";

@Controller("company-details")
export class CompanyDetailsController {
	constructor(private companyDetailsService: CompanyDetailsService) {}

	@ApiOperation({ summary: "Getting all info about company" })
	@ApiResponse({ type: [String] })
	@Get()
	async getAll() {
		try {
			const companyDetails = await this.companyDetailsService.getAllCompanyDetails();
			return companyDetails;
		} catch (error) {
			throw new InternalServerErrorException("Error while fetching all company details");
		}
	}

	@ApiOperation({ summary: "Add company details or update if they exist" })
	@ApiResponse({ type: CompanyDetails })
	@Post()
	async updateCompanyDetails(@Body() dto: UpdateCompanyDetailsDto) {
		try {
			const companyDetails = await this.companyDetailsService.updateCompanyDetails(dto);
			return companyDetails;
		} catch (error) {
			throw new InternalServerErrorException("Error while updating company details");
		}
	}
}
