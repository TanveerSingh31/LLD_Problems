import { Product } from "../../models/Product.js";
import { ProductFactory } from '../../factories/productFactory.js';
import type { ReplenishStrategy } from "../replenishStrategy.js";

export class BulkReplenishStrategy implements ReplenishStrategy {
    getProducts(sku: string, currentQuantity: number, thresholdQuantity: number, productFactory: ProductFactory): Product[] {
        if(currentQuantity < thresholdQuantity) {
            // replenish it to the max
            const desiredQuantity = thresholdQuantity * 20 - currentQuantity;
            return productFactory.getProducts(sku, desiredQuantity);
        }   
        else {
            return [];
        }
    } 
};