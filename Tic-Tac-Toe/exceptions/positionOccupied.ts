

export class PositionOccupied extends Error {
    constructor() {
        super("Position Already Occupied");
    }
}