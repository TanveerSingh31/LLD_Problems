import { Warehouse } from "../models/Warehouse.js";
import { Product } from '../models/Product.js';
import { ProductFactory } from '../factories/productFactory.js';

export interface ReplenishStrategy {
    getProducts(sku: string, currentQuantity: number, thresholdQuantity: number, productFactory: ProductFactory): Product[];
}