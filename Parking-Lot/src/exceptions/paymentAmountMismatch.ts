

export class PaymentAmountMismatch extends Error {
    constructor() {
        super("Payment amount does not match with fare");
    }
}   