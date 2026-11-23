import { ProductFactory } from "./factories/productFactory.js";
import { Warehouse } from "./models/Warehouse.js";
import { Product } from './models/Product.js';
import { InventoryManager } from "./controller/InventoryManager.js";
import { BulkReplenishStrategy } from "./strategies/concreteStrategies/bulkReplenishStrategy.js";


function main() {
    
    
    const productFactory = new ProductFactory();

    //1. Build Products
    const productList1: Product[] = productFactory.getProducts("1", 10);
    const productList2: Product[] = productFactory.getProducts("2", 10);


    const skuProductListMap1 = new Map<string, Product[]>([
        ["1", productList1.slice(0, 5)],
        ["2", productList2.slice(0, 5)]
    ]);

    const skuThresholdMap1 = new Map<string, number>([
        ["1", 2],
        ["2", 2]
    ]);


    const skuProductListMap2 = new Map<string, Product[]>([ 
        ["1", productList1.slice(6, 10)],
        ["2", productList2.slice(6, 10)]
    ]);

    const skuThresholdMap2 = new Map<string, number>([
        ["1", 2],
        ["2", 2]
    ]);


    //2. Build Warehouses
    
    const wareHouse1 = new Warehouse(skuProductListMap1, skuThresholdMap1);
    const wareHouse2 = new Warehouse(skuProductListMap2, skuThresholdMap2);


    const wareHouseList = [wareHouse1, wareHouse2];



    //3. Build inventory Management system
    const inventoryManager = InventoryManager.getInstance(wareHouseList, new BulkReplenishStrategy());


    // 4. handle inventory

    // order product
    const productList = inventoryManager.orderProduct("1", 10);

    // return product
    inventoryManager.returnProduct([productList[0]]);

    // automatically replenishes the product
}