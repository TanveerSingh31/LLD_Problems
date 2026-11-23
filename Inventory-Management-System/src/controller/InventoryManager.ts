import { WarehouseStatus } from "../enums/WarehouseStatus.js";
import { Warehouse } from "../models/Warehouse.js";
import { Product } from '../models/Product.js'; 
import type { ReplenishStrategy } from '../strategies/replenishStrategy.js';
import { JustInTimeReplenishStrategy } from "../strategies/concreteStrategies/JustInTimeReplenishStrategy.js";
import { ProductFactory } from "../factories/productFactory.js";


export class InventoryManager {
    warehouses: Warehouse[];
    replenishStrategy: ReplenishStrategy;
    static inventoryManagerInstance: InventoryManager | null = null;
    productFactory: ProductFactory;

    private constructor(warehouses: Warehouse[], replenishStrategy?: ReplenishStrategy) {
        this.warehouses = warehouses;
        this.replenishStrategy = replenishStrategy ? replenishStrategy : new JustInTimeReplenishStrategy();
        this.productFactory = new ProductFactory();
    }

    static getInstance(warehouses?: Warehouse[], replenishStrategy?: ReplenishStrategy) {
        if(!InventoryManager.inventoryManagerInstance) {
            InventoryManager.inventoryManagerInstance = new InventoryManager(warehouses!, replenishStrategy);
        }
        
        return InventoryManager.inventoryManagerInstance;
    }

    orderProduct(sku: string, desiredQuantity: number): Product[] {
    
        // 1. filter active warehouses
        const activeWarehouses = this.warehouses.filter((warehouse: Warehouse) => warehouse.status === WarehouseStatus.OPERATIONAL);

        // 2. check if the sku present in desired quantity
        const warehouse = activeWarehouses.find((warehouse) => warehouse.checkIfSkuPresentWithQuantity(sku, desiredQuantity));

        if(!warehouse) {
            throw new Error("SKU out of stock");
        }

        // 3. Remove the sku from the warehouse
        const products = warehouse?.removeProduct(sku, desiredQuantity);

        return products;
    }

    returnProduct(products: Product[]) {
        // 1. filter active warehouses
        const activeWarehouses = this.warehouses.filter((warehouse: Warehouse) => warehouse.status === WarehouseStatus.OPERATIONAL);

        // 2. filter warehouse with least quantity of the product
        let desiredWarehouse = null;
        let leastQuantity = null;
        for(let warehouse of activeWarehouses) {
            const currentQuantity = warehouse.skuProductListMap.get(products[0].sku)?.length;

            if(!currentQuantity) {
                desiredWarehouse = warehouse;
                break;
            }

            if(!leastQuantity || currentQuantity < leastQuantity ) {
                leastQuantity = currentQuantity;
                desiredWarehouse = warehouse; 
            }
        }

        // Add the sku , to the desired warehouse
        desiredWarehouse?.addProducts(products, products[0].sku);
    }
    
    replenishProduct(warehouse: Warehouse, sku: string, currentQuantity: number, thresholdQuantity: number) {
        // Fetch product list from the strategy
        const products = this.replenishStrategy.getProducts(sku, currentQuantity, thresholdQuantity, this.productFactory);
        
        // Replenish the products in the warehouse
        warehouse.addProducts(products, sku);
    }
}