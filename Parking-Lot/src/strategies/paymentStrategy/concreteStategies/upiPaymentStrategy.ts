import type { PaymentStrategy } from "../paymentStategy.js";


export class UPIPaymentStrategy implements PaymentStrategy {

    // UPI specific fields -> will be set by the Vehicle
    payeeVPA: string;
    payerVPA: string;

    constructor(payeeVPA: string, payerVPA: string) {
        this.payeeVPA = payeeVPA;
        this.payerVPA = payerVPA;
    }

    // UPI specific payment handling
    makePayment(amount: number): boolean {
        // send the request along with payee & payer details to NPCI for processing the UPI payment
        // use this.payeeVPA, this.payerVPA, and amount

        return true;
    }
}