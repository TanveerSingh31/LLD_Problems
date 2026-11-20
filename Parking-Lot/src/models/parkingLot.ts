import { VehicleType } from "../enums/VehicleType.js";
import { Vehicle } from "./vehicle.js";
import { ParkingSpot } from './parkingSpot.js';
import { ParkingSpotFactory } from '../factories/parkingSlotFactory.js';
import { PaymentFactory } from "../factories/paymentFactory.js";
import { PaymentStatus } from "../enums/PaymentStatus.js";
import { PaymentNotCompleted } from "../exceptions/paymentNotCompleted.js";
import { PaymentAmountMismatch } from '../exceptions/paymentAmountMismatch.js';
import { Payment } from './payment.js';

export class ParkingLot {
    vehicleTypeParketSlotMap: Map<VehicleType, ParkingSpot[]> = new Map();
    paymentFactory: PaymentFactory;

    constructor(vehicleTypeList: Array<{type: VehicleType, value: number}>, parkingSpotFactory: ParkingSpotFactory, paymentFactory: PaymentFactory) {
        vehicleTypeList.forEach(record => {
            this.vehicleTypeParketSlotMap.set(record.type, parkingSpotFactory.getListOfParkingSpot(record.type, record.value));
        });

        this.paymentFactory = paymentFactory;
    }

    allowEntry(vehicle: Vehicle): boolean {
        // step 1: check available parking spot for vehicle type        
        const parkingSpots = this.vehicleTypeParketSlotMap.get(vehicle.type);

        const availableParkingSpots = parkingSpots?.filter(spot => !spot.isOccupied);

        // No available parking spot
        if(!availableParkingSpots?.length) {
            return false;
        }
        
        const parkingSpot = availableParkingSpots[0];
        
        // step 2: occupy parking spot
        parkingSpot.occupySpot(vehicle);

        // step 3: add parking spot object to vehicle
        vehicle.setParkingSpot(parkingSpot);

        return true;
    }   

    static getParkingFee(vehicle: Vehicle): number {
        const parkingSpot = vehicle.parkingSpot;

        if(!parkingSpot) throw new Error("No parking spot associated with this vehicle");

        const amount = parkingSpot?.getParkingFee();

        return amount;
    }

    validatePayment(payment: Payment): boolean {
        // If payment not completed - throw error
        if(!payment || payment.getPaymentStatus() !== PaymentStatus.COMPLETED) {
            throw new PaymentNotCompleted();
        }

        return true;
    }

    allowExit(vehicle: Vehicle, payment: Payment) {
        // 1. check if payment status = completed
        this.validatePayment(payment);

        // 2. check if the payment amount is same as parking fee of the parking spot
        const fareAmount = ParkingLot.getParkingFee(vehicle);

        const paidAmount = payment.amount;

        if(fareAmount !== paidAmount) {
            throw new PaymentAmountMismatch();
        }

        // 3. Free the parking spot
        vehicle.parkingSpot?.freeSpot();
    }

}

