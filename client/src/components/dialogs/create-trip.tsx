"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import {
  SubmitHandler,
  useForm,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";

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
import { Separator } from "../ui/separator";
import { Driver } from "@/types/drivers";
import { capitalize, fireErrorToast, fireSuccessToast } from "@/lib/utils";
import InputWrapper from "../inputs-wrapper";
import { Vehicle } from "@/types/vehicles";
import SelectInput from "../ui/inputs/select-input";
import { Trip } from "@/types/trips";
import { createTrip } from "@/service/api.service";
import { redirects, revalidateTags } from "@/service/action.service";

interface Trips {
  driverId: string;
  vehicleId: string;
  distance: number;
  startDate: any;
  endDate: any;
}

function CreateTrip({ drivers }: { drivers?: Driver[] }) {
  const form = useForm<Trips>({});
  const { handleSubmit, setValue, getValues, watch, reset } = form;
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState<number>();
  const [vehiclesList, setVehiclesList] = useState<Vehicle[]>([]);

  const router = useRouter();
  watch();

  const onSubmit: SubmitHandler<Trips> = async (data) => {
    if (!data) return null;

    if (!data.driverId || !data.vehicleId || !data.distance) {
      fireErrorToast("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    const driverId = parseFloat(data.driverId);
    const vehicleId = parseFloat(data.vehicleId);
    const distance = Number(data.distance);

    try {
      const res = await createTrip({ driverId, vehicleId, distance });
      if (res.success) {
        fireSuccessToast("Trip assigned successfully");
        revalidateTags([
          "drivers",
          "vehicles",
          "trips",
          "trips/add-trip",
          "/price/stats",
        ]);
        redirects("/trips");
      } else {
        fireErrorToast(`${res.message}`);
      }
    } catch (error) {
      fireErrorToast(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handlerVehicles = () => {
    if (drivers) {
      reset({ vehicleId: "" });
      const data: Driver[] = drivers.filter((dri) => dri.id === driver);
      const filteredVehicles = data?.[0]?.vehicles.filter(
        (vehicle) => vehicle.status !== "IN_REPAIR"
      );
      if (driver !== undefined) {
        setValue("driverId", String(driver));
      }
      setVehiclesList(filteredVehicles);
    }
  };

  useEffect(() => {
    if (driver) {
      handlerVehicles();
    }
  }, [driver]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-primary">New Trip</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {ASSIGN_DRIVER_OPTIONS(drivers).map(
          ({ name, label, type, props }: InputType<keyof Driver>) => {
            return (
              <FormField
                key={name}
                control={form.control}
                name={"driverId"}
                render={({ field }) => {
                  if (field.value) {
                    setDriver(Number(field.value));
                  }
                  return (
                    <FormItem className={"mb-4"}>
                      <FormLabel className={"font-bold"}>{label}</FormLabel>
                      <FormControl>
                        <>
                          <InputWrapper type={type} props={props} {...field} />
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          }
        )}
        {vehiclesList.length > 0 && (
          <FormVehicle vehicleOptions={vehiclesList} setValue={setValue} />
        )}
        {getValues("vehicleId") && driver && vehiclesList.length > 0 && (
          <FormTrip form={form}></FormTrip>
        )}
        {!getValues("vehicleId") && driver && vehiclesList.length === 0 && (
          <div className="mt-2 text-center">
            The user has their vehicle in repair
          </div>
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

interface FormVehicleProps {
  vehicleOptions: Vehicle[];
  setValue: UseFormSetValue<Trips>;
}

interface FormTripProps {
  form: UseFormReturn<Trips>;
}

export const FormVehicle: FC<FormVehicleProps> = ({
  vehicleOptions,
  setValue,
}) => {
  const handleChange = (e: string) => {
    if (e) {
      setValue("vehicleId", e);
    }
  };

  const vehicleOpts = vehicleOptions.map((vehicle) => ({
    value: String(vehicle.id),
    label: ` ${capitalize(vehicle.brand)} ${capitalize(
      vehicle.model
    )} ${vehicle.domain.toUpperCase()}`,
    name: ` ${capitalize(vehicle.brand)} ${capitalize(
      vehicle.model
    )} ${vehicle.domain.toUpperCase()}`,
  }));

  return (
    <FormItem className={"mb-4"}>
      <FormLabel className={"font-bold"}>Select Vehicle</FormLabel>
      <FormControl>
        <>
          <SelectInput
            key={vehicleOpts?.find((option) => option.name)?.name}
            options={vehicleOpts}
            onChange={handleChange}
          />
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export const FormTrip: FC<FormTripProps> = ({ form }: FormTripProps) => {
  return (
    <>
      {ASSIGN_TRIPS_OPTIONS().map(
        ({ name, label, type, props }: InputType<keyof Trip>) => {
          return (
            <FormField
              key={name}
              control={form.control}
              name={"distance"}
              render={({ field }) => {
                return (
                  <FormItem className={"mb-4"}>
                    <FormLabel className={"font-bold"}>{label}</FormLabel>
                    <FormControl>
                      <>
                        <InputWrapper type={type} props={props} {...field} />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          );
        }
      )}
    </>
  );
};

export const ASSIGN_DRIVER_OPTIONS = (
  drivers?: Driver[]
): InputType<keyof Driver>[] => {
  const driverOptions = drivers?.map((driver) => ({
    value: String(driver.id),
    label: ` ${capitalize(driver.firstName)} ${capitalize(driver.lastName)}`,
    name: String(driver.id),
  }));
  return [
    {
      label: "Select Driver",
      name: "firstName",
      type: INPUTS_TYPES.Select,
      props: {
        options: driverOptions,
        required: true,
      },
    },
  ];
};

export const ASSIGN_TRIPS_OPTIONS = (): InputType<keyof Trip>[] => {
  return [
    {
      label: "Estimated Distance (km)",
      name: "distance",
      type: INPUTS_TYPES.Number,
      props: {
        required: true,
      },
    },
  ];
};

export default CreateTrip;
