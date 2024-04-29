import GenericModal from "@/components/generic-modal";
enum CreateType {
  CreateDriver = "create-driver",
}
export default async function ProjectDialogPage() {
  return <GenericModal type={CreateType.CreateDriver} />;
}
