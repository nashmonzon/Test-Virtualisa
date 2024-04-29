import GenericModal from "@/components/generic-modal";
import { CreateType } from "@/types/enums";

export default async function ProjectDialogPage() {
  return <GenericModal type={CreateType.CreateTrip} to={"/trips"} />;
}
