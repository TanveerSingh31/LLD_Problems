import type { ParkingSpotFareStrategy } from "../parkingSpotFareStrategy.js";

export class WeekendFareStrategy implements ParkingSpotFareStrategy {

    // Twice the base amount - charged on weekends
    getFare(amount: number): number {
        return 2 * amount;
    }
}