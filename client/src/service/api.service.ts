import {
  AssignVehicleRequestBody,
  Driver,
  GetAssignVehicle,
  GetDriver,
  GetDrivers,
} from "@/types/drivers";
import { fetcher } from "./action.service";
import { GetVehicles, RepairVehicle, Vehicle } from "@/types/vehicles";
import { GetTrips, Trip } from "@/types/trips";
import { GetPrice, GetStats, Price } from "@/types/price";

//GET
export const getDrivers = () => {
  return fetcher<GetDrivers>("/drivers", {
    next: { tags: ["drivers", "drivers/add-driver"], revalidate: 3 },
  });
};

export const getDriver = (id: string) => {
  return fetcher<GetDriver>(`/drivers/${id}`, { cache: "force-cache" });
};

export const getVehicles = () => {
  return fetcher<GetVehicles>("/vehicles", {
    next: { tags: ["vehicles", "drivers/add-driver"], revalidate: 86400 },
  });
};

export const getVehiclesWithoutDriver = (id: string) => {
  return fetcher<GetVehicles>(`/vehicles/without-driver/${id}`);
};

export const getDriversWithVehicles = () => {
  return fetcher<GetDrivers>(`/drivers/driver-vehicles`, {
    next: { tags: ["drivers", "drivers/add-driver"], revalidate: 86400 },
  });
};

export const getTrips = () => {
  return fetcher<GetTrips>(`/trips`, {
    next: { tags: ["trips", "/trips/add-trip"], revalidate: 86400 },
  });
};

export const getPrice = () => {
  return fetcher<GetPrice>(`/price`);
};

export const gatStats = () => {
  return fetcher<GetStats>(`/price/stats`, {
    next: { tags: ["/price/stats", "price"], revalidate: 86400 },
  });
};

//POST
export const createDriver = (body: Partial<Driver>) => {
  return fetcher<GetDriver>(`/drivers`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const createVehicle = (body: Partial<Vehicle>) => {
  return fetcher<GetVehicles>(`/vehicles`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const createAssignment = (body: AssignVehicleRequestBody) => {
  return fetcher<GetAssignVehicle>(`/drivers/assign`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const createTrip = (body: Partial<Trip>) => {
  return fetcher<GetTrips>(`/trips`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

export const createPrice = (body: Partial<Price>) => {
  return fetcher<GetPrice>(`/price`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};

//PATCH
export const repairCar = (id: number) => {
  return fetcher<RepairVehicle>(`/vehicles/${id}`, {
    method: "PATCH",
  });
};
