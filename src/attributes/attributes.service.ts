import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Attribute } from "./attribute.model";

@Injectable()
export class AttributesService {
	constructor(@InjectModel(Attribute) private attributesRepository: typeof Attribute) {}

	getAllAttributes() {
		return this.attributesRepository.findAll();
	}

	addAttribute(title: string) {
		return this.attributesRepository.create(title);
	}

	deleteAttribute(id: number) {
		return this.attributesRepository.destroy({ where: { id } });
	}
}
