import { GetDriver, GetDrivers } from "@/types/drivers";
import { fetcher } from "./action.service";
import { GetVehicles } from "@/types/vehicles";

export const getDrivers = () => {
  return fetcher<GetDrivers>("/drivers", {
    next: { tags: ["drivers", "drivers/add-driver"], revalidate: 86400 },
    cache: "no-store",
  });
};

export const getDriver = (id: string) => {
  return fetcher<GetDriver>(`/drivers/${id}`, { cache: "force-cache" });
};

export const createDriver = (body: any) => {
  return fetcher<GetDriver>(`/drivers`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
export const getVehicles = () => {
  return fetcher<GetVehicles>("/vehicles", {
    next: { tags: ["vehicles", "drivers/add-driver"] },
    cache: "no-store",
  });
};

export const createVehicle = (body: any) => {
  return fetcher<GetVehicles>(`/vehicles`, {
    method: "POST",
    body: JSON.stringify(body),
  });
};
