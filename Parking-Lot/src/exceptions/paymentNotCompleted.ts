

export class PaymentNotCompleted extends Error {
    constructor() {
        super("Please complete payment before exit");
    }
}