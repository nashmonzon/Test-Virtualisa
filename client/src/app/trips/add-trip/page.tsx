import GenericModal from "@/components/generic-modal";
import { getDriversWithVehicles } from "@/service/api.service";
import { Driver } from "@/types/drivers";
import { CreateType } from "@/types/enums";

export default async function ProjectDialogPage() {
  const dataDrivers = await getDriversWithVehicles();
  let drivers: Driver[] = [];

  if (dataDrivers.success) {
    drivers = dataDrivers.data.drivers;
  }

  return (
    <GenericModal
      type={CreateType.CreateTrip}
      to={"/trips"}
      drivers={drivers}
    />
  );
}
