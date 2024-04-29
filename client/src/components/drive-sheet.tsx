"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";
import { type Drivers } from "@/app/drivers/columns";

function DriverSheet({ details }: { details: Drivers }) {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const form = useForm<any>({
    defaultValues: details,
  });
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

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
                {` ${details.firstName} ${details.lastName}`}
              </span>
            </SheetDescription>
          </SheetHeader>

          <div className="pl-2 mt-4">
            <h1 className="text-primary">Personal Details</h1>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
              {Object.entries(details).map(([key, value]) => {
                if (key === "id") return null;
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
          <div className="pl-2 mt-6">
            <h1 className="text-primary">Vehicles Details</h1>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
              {Object.entries(details).map(([key, value]) => {
                if (key === "id") return null;
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
          <div className="pl-2 mt-6">
            <h1 className="text-primary">Trips Details</h1>
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4 pl-2 mt-4">
              {Object.entries(details).map(([key, value]) => {
                if (key === "id") return null;
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
        </SheetContent>
      </Sheet>
    </>
  );
}
enum DRIVER {
  firstName = "First Name",
  lastName = "Last Name",
  dni = "DNI",
  distance = "Distance",
  licenseType = "License Type",
  licenseExpiry = "License Expiry",
  status = "Status",
}

const array = (key: keyof typeof DRIVER) => {
  if (DRIVER[key]) {
    return DRIVER[key];
  }
  return null;
};

export default DriverSheet;
