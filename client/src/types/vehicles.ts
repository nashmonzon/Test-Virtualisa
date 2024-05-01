import { DriverVehicle } from "./drivers";
import { VehicleStatus } from "./enums";
import { Service } from "./service";
import { Trip } from "./trips";

export interface Vehicle {
  id: number;
  domain: string;
  brand: string;
  model: string;
  mileage: number;
  status: VehicleStatus;
  drivers: DriverVehicle[];
  trips: Trip[];
  services: Service[];
}
