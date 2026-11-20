import { ParkingSpot } from '../models/parkingSpot.js';
import { VehicleType } from '../enums/VehicleType.js';

export class ParkingSpotFactory {

    getListOfParkingSpot(type: VehicleType, count: number) {
        const res: ParkingSpot[] = [];

        for(let i=0; i<count; i++) {
            res.push(new ParkingSpot(type));
        }

        return res;
    }
}