import { ParkingLotController } from "./controller/parkingLotController.js";
import { VehicleType } from "./enums/VehicleType.js";
import { Vehicle } from "./models/vehicle.js";


function main() {
    const vehicle1 = new Vehicle(123, VehicleType.CAR);
    const vehicle2 = new Vehicle(456, VehicleType.TRUCK);

    const listOfParkingSpots = [
        { type: VehicleType.CAR, value: 50},
        { type: VehicleType.BIKE, value: 20},
        { type: VehicleType.TRUCK, value: 10}
    ];

    const parkingLotController = new ParkingLotController(listOfParkingSpots);
    
    // use - setParkingSpotFareStrategy, to update fare strategy of parking spots - dynamically

    parkingLotController.enterVehicle(vehicle1);
    parkingLotController.enterVehicle(vehicle2);

    parkingLotController.exitVehicle(vehicle2);
    parkingLotController.exitVehicle(vehicle1);
}


main();

