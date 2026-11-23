
import { Product } from '../../models/Product.js';
import { ProductFactory } from '../../factories/productFactory.js';
import type { ReplenishStrategy } from '../replenishStrategy.js';

export class JustInTimeReplenishStrategy implements ReplenishStrategy {
    getProducts(sku: string, currentQuantity: number, thresholdQuantity: number, productFactory: ProductFactory) : Product[] {
        if(currentQuantity < thresholdQuantity) {
            const desiredQuantity = thresholdQuantity - currentQuantity;
            return productFactory.getProducts(sku, desiredQuantity);
        }   
        else {
            return [];
        }
    } 
};