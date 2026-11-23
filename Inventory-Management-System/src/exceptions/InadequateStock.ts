export class InadequateStock extends Error {
    constructor() {
        super("Stock less than the demanded quantity");
    }
}