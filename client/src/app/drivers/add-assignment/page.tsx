import GenericModal from "@/components/generic-modal";
import { getDrivers } from "@/service/api.service";
import { Driver } from "@/types/drivers";
import { CreateType } from "@/types/enums";

export default async function ProjectDialogPage() {
  const dataDrivers = await getDrivers();
  let drivers: Driver[] = [];

  if (dataDrivers.success) {
    drivers = dataDrivers.data.drivers;
  }

  return (
    <GenericModal
      type={CreateType.CreateAssignment}
      to={"/drivers/add-assignment"}
      drivers={drivers}
    />
  );
}
