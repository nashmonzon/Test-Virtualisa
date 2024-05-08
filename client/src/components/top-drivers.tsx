import { Driver } from "@/types/drivers";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { capitalize } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

export function RecentSales({ drivers }: { drivers: Driver[] }) {
  const sortedDrivers = drivers.sort((a, b) => b.kilometers - a.kilometers);

  return (
    <ScrollArea className="h-72  rounded-md ">
      <div className="space-y-8">
        {sortedDrivers.map((driver) => (
          <div key={driver.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{`${capitalize(driver.firstName[0])}${capitalize(
                driver.lastName[0]
              )}`}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{`${capitalize(
                driver.firstName
              )} ${capitalize(driver.lastName)}`}</p>
            </div>
            <div className="ml-auto font-medium">{`${driver.kilometers} km`}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
