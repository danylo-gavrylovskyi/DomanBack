import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

import { CompanyDetails } from "./company-details.model";

import { CompanyDetailsController } from "./company-details.controller";
import { CompanyDetailsService } from "./company-details.service";

@Module({
	controllers: [CompanyDetailsController],
	providers: [CompanyDetailsService],
	imports: [SequelizeModule.forFeature([CompanyDetails])],
})
export class CompanyDetailsModule {}
