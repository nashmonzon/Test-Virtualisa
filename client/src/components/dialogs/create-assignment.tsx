"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";

import { DialogHeader } from "../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input as InputType, INPUTS_TYPES } from "@/types/inputsTypes";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/inputs/input";
import { Separator } from "../ui/separator";
import { type Vehicles } from "@/app/vehicles/columns";
import { redirects, revalidateTags } from "@/service/action.service";
import { createAssignment, createVehicle } from "@/service/api.service";
import { capitalize, fireSuccessToast } from "@/lib/utils";
import { toast } from "sonner";
import InputWrapper from "../inputs-wrapper";
import { Driver, DriverVehicle } from "@/types/drivers";
import { Vehicle } from "@/types/vehicles";

function CreateAssignment({
  drivers,
  vehicles,
}: {
  drivers?: Driver[];
  vehicles?: Vehicle[];
}) {
  const form = useForm<DriverVehicle>({});
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<DriverVehicle> = async (data) => {
    if (!data) return;

    try {
      const driverId = Number(data.driver);
      const vehicleId = Number(data.vehicle);

      if (!driverId || !vehicleId) {
        console.error("Driver or vehicle not found");
        return;
      }

      await createAssignment({ driverId, vehicleId });
      fireSuccessToast("The vehicle was assigned");
      revalidateTags(["drivers", "vehicles"]);
      redirects("/drivers");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-primary">Assign Vehicle</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {ASSIGN_VEHICLE_OPTIONS(drivers, vehicles).map(
          ({ name, label, type, props }: InputType<keyof DriverVehicle>) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={name || "ERROR_MISSING_INPUT_NAME"}
                render={({ field }) => (
                  <FormItem className={"mb-4"}>
                    <FormLabel className={"font-bold"}>{label}</FormLabel>

                    <FormControl>
                      <InputWrapper type={type} props={props} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          }
        )}

        <div className="mt-6 flex justify-between">
          <Button
            size={"sm"}
            onClick={() => router.back()}
            variant={"outline"}
            type={"button"}
          >
            Cancel
          </Button>
          <Button size={"sm"} type={"submit"}>
            {loading ? (
              <Loader2 className="text-primary-500 size-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export const ASSIGN_VEHICLE_OPTIONS = (
  drivers?: Driver[],
  vehicles?: Vehicle[]
): InputType<keyof DriverVehicle>[] => {
  const driverOptions = drivers?.map((driver) => ({
    value: String(driver.id),
    label: ` ${capitalize(driver.firstName)} ${capitalize(driver.lastName)}`,
    name: String(driver.id),
  }));

  const vehicleOptions = vehicles?.map((vehicle) => ({
    value: String(vehicle.id),
    label: ` ${capitalize(vehicle.brand)} ${capitalize(
      vehicle.model
    )} ${vehicle.domain.toUpperCase()}`,
    name: String(vehicle.id),
  }));

  return [
    {
      label: "Select Driver",
      name: "driver",
      type: INPUTS_TYPES.Select,
      props: {
        options: driverOptions,
        required: true,
      },
    },
    {
      label: "Select Vehicle",
      name: "vehicle",
      type: INPUTS_TYPES.Select,
      props: {
        options: vehicleOptions,
        required: true,
      },
    },
  ];
};

export default CreateAssignment;
