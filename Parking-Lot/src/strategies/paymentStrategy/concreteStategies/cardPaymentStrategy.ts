import type { PaymentStrategy } from "../paymentStategy.js";


export class CardPaymentStrategy implements PaymentStrategy {

    payerCardNumber: string;
    cardType: string;
    cvv: number;
    otp: number;

    constructor(payerCardNumber: string, cardType: string, cvv: number, otp: number) {
        this.payerCardNumber = payerCardNumber;
        this.cardType = cardType;
        this.cvv = cvv;
        this.otp = otp;
    }

    // Make CARD payment
    makePayment(amount: number): boolean {
        // send the request along with payee & payer details to bank for processing the card payment
        
        // utilise CardPayment class properties - payerCardNumber, cardType, cvv, otp -> to make card payment

        return true;
    }
}