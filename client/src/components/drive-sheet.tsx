"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { capitalize, formatNumber } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";
import { Driver } from "@/types/drivers";
import { formatDate } from "@/lib/dates";

function DriverSheet({ details }: { details?: Driver }) {
  if (!details) {
    return null;
  }

  const router = useRouter();
  const params = useSearchParams();

  function handleOpenChange(_open: boolean) {
    if (!_open) {
      router.push(
        `/drivers${Object.keys(params).length ? "?" + params.toString() : ""}`
      );
    }
  }

  return (
    <>
      <Sheet defaultOpen onOpenChange={handleOpenChange}>
        <SheetContent position="right" size="lg" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Driver details </SheetTitle>
            <SheetDescription>
              See details for
              <span className="font-bold">
                {` ${capitalize(details?.firstName)} ${capitalize(
                  details?.lastName
                )}`}
              </span>
            </SheetDescription>
          </SheetHeader>

          <div className="pl-2 mt-4">
            <h1 className="text-primary">Personal Details</h1>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
              {Object.entries(details).map(([key, value]) => {
                if (typeof value === "object") {
                  return null;
                }
                if (key === "id" || !DRIVER[key as keyof typeof DRIVER])
                  return null;
                value =
                  key === "licenseExpiry"
                    ? formatDate(value)
                    : key === "kilometers"
                    ? `${value} Km`
                    : capitalize(value);
                return (
                  <div key={key} className="flex flex-col">
                    <span className="font-bold">
                      {array(key as keyof typeof DRIVER)}:{" "}
                      <span className="font-normal">{value}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {details.vehicles.length > 0 && (
            <div className="pl-2 mt-6">
              <h1 className="text-primary">Assigned Vehicles</h1>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
                {details.vehicles.map((vehicle, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="font-bold">
                      Vehicle:
                      <span className="font-normal">
                        {" "}
                        {`${capitalize(vehicle.brand)} ${capitalize(
                          vehicle.model
                        )} ${vehicle.domain.toUpperCase()}`}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {details.trips.length > 0 && (
            <div className="pl-2 mt-6">
              <h1 className="text-primary">Trips Stats</h1>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
                <div className="flex flex-col">
                  <span className="font-bold">
                    Total Trips:
                    <span className="font-normal"> {details.trips.length}</span>
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="font-bold">
                    Total Money:
                    <span className="font-normal">
                      {" "}
                      $
                      {formatNumber(
                        details.trips.reduce(
                          (total, trip) => total + trip.totalPrice,
                          0
                        )
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
enum DRIVER {
  firstName = "First Name",
  lastName = "Last Name",
  dni = "DNI",
  kilometers = "Distance",
  licenseType = "License Type",
  licenseExpiry = "License Expiry",
}

const array = (key: keyof typeof DRIVER) => {
  if (DRIVER[key]) {
    return DRIVER[key];
  }
  return null;
};

export default DriverSheet;
