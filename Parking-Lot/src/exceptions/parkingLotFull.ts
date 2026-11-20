
export class ParkingLotFull extends Error {
    constructor() {
        super("Parking Lot is full, come again in sometime");
    }
}