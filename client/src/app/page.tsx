import CardWrapper from "@/components/card-wrapper";
import NavBar from "@/components/nav-bar";
import { Overview } from "@/components/overview";

import { RecentSales } from "@/components/top-drivers";
import { buttonVariants } from "@/components/ui/button";
import Container from "@/components/ui/container";
import {
  calculateTotalDistance,
  cn,
  fireErrorToast,
  formatNumber,
} from "@/lib/utils";
import { gatStats, getDrivers } from "@/service/api.service";

import Link from "next/link";

export default async function Home() {
  const statsData = await gatStats();
  const driversData = await getDrivers();

  if (!driversData.success) {
    fireErrorToast();
    return;
  }
  if (!statsData.success) {
    fireErrorToast();
    return;
  }
  const { lastPrice, trips, repairVehicleCount, unableToDriveCount } =
    statsData.data;

  return (
    <div>
      <NavBar />
      <div
        id={"analytics-container"}
        className="align-center m-4 flex flex-col justify-center "
      >
        <Container>
          <div className="mb-4 flex  items-center justify-between gap-2 sm:flex-row">
            <h2 className="page-title text-primary">Dashboard</h2>
            <div className="flex gap-2">
              <Link
                href={`/price/add-price`}
                className={cn(
                  "capitalize",
                  "hover:text-primary-foreground",
                  "bg-[#ac5b96] text-primary-foreground",
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })
                )}
              >
                Add Price Km
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <CardWrapper
                  title={"Current Price Per Km"}
                  cHdDescription="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                  <div className="text-2xl font-bold">
                    $ {`${formatNumber(Number(lastPrice))}`}
                  </div>
                </CardWrapper>
                <CardWrapper
                  title={"Total Trips Made"}
                  cHdDescription="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                  <>
                    <div className="text-2xl font-bold">{`${trips.length}`}</div>
                    <p className="text-xs text-muted-foreground">
                      Total distance:{" "}
                      {`${calculateTotalDistance({ trips })} km`}
                    </p>
                  </>
                </CardWrapper>
                <CardWrapper
                  title={"Vehicles Under Repair"}
                  cHdDescription="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                  <div className="text-2xl font-bold">
                    {`${repairVehicleCount}`}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Currently being repaired
                  </p>
                </CardWrapper>
                <CardWrapper
                  title={"Disabled drivers"}
                  cHdDescription="flex flex-row items-center justify-between space-y-0 pb-2"
                >
                  <div className="text-2xl font-bold">{unableToDriveCount}</div>
                  <p className="text-xs text-muted-foreground">
                    Unable to drive due to license issues
                  </p>
                </CardWrapper>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <CardWrapper title={"Trips Per Month"} className="col-span-4">
                <Overview trips={trips} />
              </CardWrapper>
              <CardWrapper
                title={"Top Drivers"}
                description="Top drivers based on kilometers driven."
                className="col-span-3"
              >
                <RecentSales drivers={driversData?.data?.drivers} />
              </CardWrapper>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
