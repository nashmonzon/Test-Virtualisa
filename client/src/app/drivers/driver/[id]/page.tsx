import DriverSheet from "@/components/drive-sheet";
import { getDriver } from "@/service/api.service";

interface DriverDetailsProps {
  params: {
    id: string;
  };
}
export default async function DriverDetails({
  params: { id },
}: DriverDetailsProps) {
  const res = await getDriver(id);

  if (!res.success) {
    return null;
  }

  const driver = res.data.driver;

  return <DriverSheet details={driver} />;
}
