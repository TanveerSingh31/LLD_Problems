import type { PaymentStrategy } from "../paymentStategy.js";


export class CashPaymentStrategy implements PaymentStrategy {

    // No data members added for Cash, since payee & payer data required

    makePayment(amount: number): boolean {
        // accept cash
        return true;
    }
}