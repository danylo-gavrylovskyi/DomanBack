import { Product } from "src/products/product.model";

export interface OrderedProduct {
	product: Product;
	quantity: number;
}
