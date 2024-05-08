import { Trip } from "./trips";

export interface Price {
  id: number;
  pricePerKm: number;
  day: number;
  month: number;
  year: number;
}

export interface GetPrice {
  count: number;
  price: Price[];
  status: number;
}

export interface GetStats {
  trips: Trip[];
  lastPrice: number;
  repairVehicleCount: number;
  unableToDriveCount: number;
  status: number;
}
