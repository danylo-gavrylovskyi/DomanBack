import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class BannersService {
	getAllBanners() {
		let bannersNames: Promise<string[]> = fs.promises.readdir(
			path.join(__dirname, "..", "..", "..", "uploads", "banners")
		);
		return bannersNames;
	}

	deleteBanner(bannerUrl: string) {
		fs.unlink(path.join(__dirname, "..", "..", "..", "uploads", "banners", bannerUrl), (err) => {
			if (err) {
				throw new HttpException(
					"Error while deleting banner",
					HttpStatus.INTERNAL_SERVER_ERROR
				);
			}
		});
	}
}
