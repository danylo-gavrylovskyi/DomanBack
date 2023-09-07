import { InternalServerErrorException } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

export const deleteImage = (folder: string, image: string) => {
	fs.unlink(path.join(__dirname, "..", "..", "uploads", folder, image), (err) => {
		if (err) throw new InternalServerErrorException("Error while deleting image from folder");
	});
};
