import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";

export const imageStorage = (folder: string): MulterOptions => {
	return {
		storage: diskStorage({
			destination: `./uploads/${folder}`,
			filename: (req, file, callback) => {
				const filename: string =
					path.parse(file.originalname).name.replace(/\s/g, "") + uuidv4();
				const extension: string = path.parse(file.originalname).ext;
				callback(null, `${filename}${extension}`);
			},
		}),
	};
};
