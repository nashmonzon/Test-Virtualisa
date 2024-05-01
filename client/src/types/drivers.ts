import { LicenseType } from "./enums";
import { Trip } from "./trips";
import { Vehicle } from "./vehicles";

export interface GetDrivers {
  count: number;
  drivers: Driver[];
  status: number;
}
export interface GetDriver {
  driver: Driver;
  status: number;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  licenseType: LicenseType;
  licenseExpiry: string;
  kilomiters: number;
  vehicles: DriverVehicle[];
  trips: Trip[];
}

export interface DriverVehicle {
  id: number;
  driverId: number;
  vehicleId: number;
  driver: Driver;
  vehicle: Vehicle;
}
