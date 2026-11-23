import { Product } from './Product.js';
import { WarehouseStatus } from '../enums/WarehouseStatus.js'; 
import { ProductNotFound } from '../exceptions/ProductNotFound.js';
import { InadequateStock } from '../exceptions/InadequateStock.js';
import { InventoryManager } from '../controller/InventoryManager.js';

export class Warehouse {
    skuProductListMap: Map<string, Product[]>;
    skuThresholdMap: Map<string, number>;
    status: WarehouseStatus;

    constructor(skuProductListMap: Map<string, Product[]>, skuThresholdMap: Map<string, number>) {
        this.skuProductListMap = skuProductListMap;
        this.skuThresholdMap = skuThresholdMap;
        this.status = WarehouseStatus.OPERATIONAL;
    }


    removeProduct(sku: string, quantity: number) {
        const productList = this.skuProductListMap.get(sku);

        if(!productList) {
            throw new ProductNotFound();
        }

        if(productList.length < quantity) {
            throw new InadequateStock();
        }

        // delete products from the list
        const orderedProducts = productList.splice(0, quantity);

        // if the product list <= threshold quantity for that sku -> notify the inventory manager to replenish
        const currentQuantity = productList.length;
        const thresholdQuantity = this.skuThresholdMap.get(sku)!;
        if(currentQuantity <= thresholdQuantity) {
            const inventoryManager = InventoryManager.getInstance();
            inventoryManager.replenishProduct(this, sku, currentQuantity, thresholdQuantity);
        }


        return orderedProducts;

    }


    addProducts(products: Product[], sku: string) {

        const currentProductList = this.skuProductListMap.get(sku);

        // check if sku exists in the map or not.
        if(currentProductList) {
            this.skuProductListMap.set(sku, [...currentProductList, ...products]);
        }
        else {
            this.skuProductListMap.set(sku, products);
        }
    }


    checkIfSkuPresentWithQuantity(sku: string, desiredQuantity: number) {
        // check if sku present & in desired quantity
        return this.skuProductListMap.get(sku)?.length || 0 >= desiredQuantity;
    }

}