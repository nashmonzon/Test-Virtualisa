import { Vehicle } from "./vehicles";

export interface Service {
  id: number;
  vehicleId: number;
  date: string;
  vehicle: Vehicle;
}
