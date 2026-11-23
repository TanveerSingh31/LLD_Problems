import { Product } from '../models/Product.js';
import { ProductType } from '../enums/ProductType.js';

export class ProductFactory {

    getProducts(sku: string, quantity: number): Product[] {
        const productList: Product[] = [];
        switch(sku) {
            case '1':
                while(quantity > 0) {
                    productList.push(new Product(sku, "Oven", 1000, 1, ProductType.ELECTRONICS));
                    quantity--;
                }

                return productList;

            case '2':
                while(quantity > 0) {
                    productList.push(new Product(sku, "Tyre", 500, 1, ProductType.AUTOMOTIVE));
                    quantity--;
                }
                return productList;

            case '3':
                while(quantity > 0) {
                    productList.push(new Product(sku, "Milk", 50, 1, ProductType.GROCERY));
                    quantity--;
                }
                return productList;
        }

        return productList;
    }

}