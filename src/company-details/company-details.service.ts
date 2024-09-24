import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { CompanyDetails } from "./company-details.model";

import { UpdateCompanyDetailsDto } from "./dto/updateCompanyDetails.dto";

@Injectable()
export class CompanyDetailsService {
	constructor(@InjectModel(CompanyDetails) private companyDetailsRepo: typeof CompanyDetails) {}

	getAllCompanyDetails() {
		return this.companyDetailsRepo.findOne({ where: { id: 1 } }); // we have only one row here
	}

	async updateCompanyDetails(dto: UpdateCompanyDetailsDto) {
		const [findedProduct, isCreated] = await this.companyDetailsRepo.findOrCreate({
			where: { id: 1 }, // id 1 because we have only one row for company details in this table
			defaults: dto,
		});

		if (!isCreated) {
			await this.companyDetailsRepo.update(dto, { where: { id: 1 } });
			return this.companyDetailsRepo.findOne({ where: { id: 1 } });
		}

		return findedProduct;
	}
}
