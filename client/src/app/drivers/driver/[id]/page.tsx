import DriverSheet from "@/components/drive-sheet";

import { getData } from "../../page";
interface DriverDetailsProps {
  params: {
    id: string;
  };
}
export default async function DriverDetails({
  params: { id },
}: DriverDetailsProps) {
  const data = await getData();
  const driver = data.find((driver) => driver.id === id);
  if (!driver) {
    return <p>No driver found with the provided ID</p>;
  }
  return <DriverSheet details={driver} />;
}
