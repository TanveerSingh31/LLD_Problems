import type { ParkingSpotFareStrategy } from "../parkingSpotFareStrategy.js";

export class WeekdayFareStrategy implements ParkingSpotFareStrategy {
    getFare(baseAmount: number) {
        return baseAmount;
    }
}