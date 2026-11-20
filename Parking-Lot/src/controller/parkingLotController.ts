
import { Vehicle } from '../models/vehicle.js';
import { VehicleType } from '../enums/VehicleType.js';
import { ParkingLot } from '../models/parkingLot.js';
import { ParkingSpotFactory } from '../factories/parkingSlotFactory.js';
import { PaymentFactory } from '../factories/paymentFactory.js';
import { ParkingLotFull } from '../exceptions/parkingLotFull.js';

export class ParkingLotController {

    private readonly parkingLot: ParkingLot;
    parkingSpotFactory: ParkingSpotFactory;
    paymentFactory: PaymentFactory;

    constructor(vehicleTypeList: Array<{type: VehicleType, value: number}>) {
        this.parkingSpotFactory = new ParkingSpotFactory();
        this.paymentFactory = new PaymentFactory();

        // could have used here Singleton - to get single instance of parking lot.
        this.parkingLot = new ParkingLot(vehicleTypeList, this.parkingSpotFactory, this.paymentFactory);
    }

    enterVehicle(vehicle: Vehicle) {
        const isEntryAllowed = this.parkingLot.allowEntry(vehicle);
        if(!isEntryAllowed) throw new ParkingLotFull();
    }

    exitVehicle(vehicle: Vehicle) {
        const paymentObj = vehicle.makePayment(this.paymentFactory);
        this.parkingLot.allowExit(vehicle, paymentObj);
    }
}