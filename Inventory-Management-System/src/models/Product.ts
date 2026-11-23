import { ProductType } from '../enums/ProductType.js';
import { v4 as uuid } from 'uuid';

export class Product {
    readonly id: string;
    readonly sku: string;
    readonly name: string;
    readonly price: number;
    readonly quantity: number;
    readonly productType: ProductType;

    constructor(sku: string, name: string, price: number, quantity: number, productType: ProductType) {
        this.id = uuid();
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.productType = productType;
    }


    public getSku() {
        return this.sku;
    }
}