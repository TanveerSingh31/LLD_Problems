import { PaymentMethod } from "../enums/PaymentMethod.js";
import { CardPaymentStrategy } from "../strategies/paymentStrategy/concreteStategies/cardPaymentStrategy.js";
import { CashPaymentStrategy } from "../strategies/paymentStrategy/concreteStategies/cashPaymentStrategy.js";
import { UPIPaymentStrategy } from "../strategies/paymentStrategy/concreteStategies/upiPaymentStrategy.js";
import { Payment } from '../models/payment.js';

export class PaymentFactory {

    getPaymentObject(method: PaymentMethod, amount: number, payerData?: Record<string, any> ) {

        switch(method) {
            case PaymentMethod.CARD: {
                const { payerCardNumber, cardType, cvv, otp } = payerData!;
                return new Payment(PaymentMethod.CARD, new CardPaymentStrategy(payerCardNumber, cardType, cvv, otp), amount);
            }
            case PaymentMethod.CASH: {
                return new Payment(PaymentMethod.CASH, new CashPaymentStrategy(), amount);
            }
            case PaymentMethod.UPI: {
                const { payerVPA, payeeVPA } = payerData!;
                return new Payment(PaymentMethod.UPI, new UPIPaymentStrategy(payeeVPA, payerVPA), amount);
            }
            default : {
                throw new Error("Payment method not unsupported");
            }
        }
    }
}