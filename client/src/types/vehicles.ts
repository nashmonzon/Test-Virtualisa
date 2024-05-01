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

export interface GetVehicles {
  count: number;
  vehicles: Vehicle[];
  status: number;
}

export interface GetVehicle {
  vehicle: Vehicle;
  status: number;
}
