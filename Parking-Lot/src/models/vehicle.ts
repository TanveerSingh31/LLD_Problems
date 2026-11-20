import type { VehicleType } from '../enums/VehicleType.js';
import type { ParkingSpot } from './parkingSpot.js';
import { PaymentFactory } from '../factories/paymentFactory.js';
import { PaymentMethod } from '../enums/PaymentMethod.js';
import { Payment } from './payment.js';
import { ParkingLot } from './parkingLot.js';

export class Vehicle {
    licensePlateNumber: number;
    type: VehicleType;
    parkingSpot: ParkingSpot | null = null;

    constructor(number: number, type: VehicleType, parkingSpot?: ParkingSpot) {
        this.licensePlateNumber = number;
        this.type = type;
        if(parkingSpot) this.parkingSpot = parkingSpot;
    }


    // sets & stores parking spot object assigned to the vehicle
    setParkingSpot(parkingSpot: ParkingSpot) {
        this.parkingSpot = parkingSpot;
    }

    makePayment(paymentFactory: PaymentFactory) : Payment {

        const amount = ParkingLot.getParkingFee(this);
        
        // get payment object, with appropriate payment method
        const payment = paymentFactory.getPaymentObject(
            PaymentMethod.UPI,
            amount,
            { payeeVPA: "123@abc", payerVPA: "1234@abc" }
        );

        // invoke makePayment() to initiate payment via the payment obj.
        payment.makePayment();

        return payment
    }
}