import { VehicleType } from '../enums/VehicleType.js';
import { Vehicle } from './vehicle.js';
import type { ParkingSpotFareStrategy } from '../strategies/parkingSpotFareStrategy/parkingSpotFareStrategy.js';
import { VEHICLE_TYPE_BASE_AMOUNT } from '../utils/constants.js';
import { WeekdayFareStrategy } from '../strategies/parkingSpotFareStrategy/concreteStrategies/weekdayFareStrategy.js';

export class ParkingSpot {
    type: VehicleType;
    baseAmount: number;
    isOccupied: boolean = false;
    occupiedAt: Date | null = null;
    vehicle: Vehicle | null = null;
    parkingSpotFareStrategy: ParkingSpotFareStrategy = new WeekdayFareStrategy(); // default- weekday, derives the fare of the parking spot

    constructor(type: VehicleType) {
        this.type = type;
        this.baseAmount = VEHICLE_TYPE_BASE_AMOUNT[type]; // get base amount based on vehicle type -> fare strategy will operate on this base amount only
    }

    setParkingSpotFareStrategy(strategy: ParkingSpotFareStrategy) {
        this.parkingSpotFareStrategy = strategy;
    }

    occupySpot(vehicle: Vehicle) {
        this.vehicle = vehicle;
        this.occupiedAt = new Date();
        this.isOccupied = true;
    }

    freeSpot() {
        this.vehicle = null;
        this.occupiedAt = null;
        this.isOccupied = false;
    }

    getParkingFee(): number {
        // Get parking fee, using fare strategy
        return this.parkingSpotFareStrategy.getFare(this.baseAmount);
    }
}