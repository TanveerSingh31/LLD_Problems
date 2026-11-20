import { PaymentStatus } from '../enums/PaymentStatus.js';
import { v4 as uuid } from 'uuid';
import { PaymentMethod } from '../enums/PaymentMethod.js';
import type { PaymentStrategy } from '../strategies/paymentStrategy/paymentStategy.js';

export class Payment {
    readonly paymentId: string;
    readonly paymentMethod: PaymentMethod;
    readonly amount: number;
    private status: PaymentStatus = PaymentStatus.PENDING;
    paymentStrategy: PaymentStrategy;


    constructor(paymentMethod: PaymentMethod, paymentStrategy: PaymentStrategy, amount: number) {
        this.paymentId = uuid();
        this.paymentMethod = paymentMethod;
        this.paymentStrategy = paymentStrategy;
        this.amount = amount;
    }


    makePayment() {
        const res = this.paymentStrategy.makePayment(this.amount);

        // Update the status of payment
        if(res) {
            this.status = PaymentStatus.COMPLETED;
        }
        else {
            this.status = PaymentStatus.FAILED;
        }
    }


    getPaymentStatus() {
        return this.status;
    }

}