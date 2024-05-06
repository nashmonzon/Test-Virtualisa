import { Driver } from "./drivers";
import { Vehicle } from "./vehicles";

export interface Trip {
  id: number;
  driverId: number;
  vehicleId: number;
  distance: number;
  startDate: string;
  endDate: string;
  driver: Driver;
  vehicle: Vehicle;
}

export interface GetTrips {
  count: number;
  trips: Trip[];
  status: number;
}
