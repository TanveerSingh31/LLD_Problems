
export class ProductNotFound extends Error {
    constructor() {
        super("sku is not available");
    }
}