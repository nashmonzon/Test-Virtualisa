import GenericModal from "@/components/generic-modal";
import { getDrivers, getVehicles } from "@/service/api.service";
import { Driver } from "@/types/drivers";
import { CreateType } from "@/types/enums";
import { Vehicle } from "@/types/vehicles";

export default async function ProjectDialogPage() {
  const driverList = getDrivers();
  const vehicleList = getVehicles();
  const [dataDrivers, dataVehicles] = await Promise.all([
    driverList,
    vehicleList,
  ]);

  let drivers: Driver[] = [];
  let vehicles: Vehicle[] = [];
  if (dataDrivers.success && dataVehicles.success) {
    (drivers = dataDrivers.data.drivers),
      (vehicles = dataVehicles.data.vehicles);
  }

  return (
    <GenericModal
      type={CreateType.CreateAssignment}
      to={"/drivers/add-assignment"}
      drivers={drivers}
      vehicles={vehicles}
    />
  );
}
