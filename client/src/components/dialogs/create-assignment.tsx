import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm, UseFormSetValue } from "react-hook-form";
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
import { redirects, revalidateTags } from "@/service/action.service";
import {
  createAssignment,
  getVehiclesWithoutDriver,
} from "@/service/api.service";
import { capitalize, fireSuccessToast } from "@/lib/utils";

import InputWrapper from "../inputs-wrapper";
import { Driver, DriverVehicle } from "@/types/drivers";
import { Vehicle } from "@/types/vehicles";
import SelectInput from "../ui/inputs/select-input";

function CreateAssignment({ drivers }: { drivers?: Driver[] }) {
  const form = useForm<DriverVehicle>({});
  const { handleSubmit, setValue } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [driver, setDriver] = useState<number>();

  const [vehicleOptions, setVehicleOptions] = useState<
    Array<{ label: string; value: string; name?: string }>
  >([]);

  const onSubmit: SubmitHandler<DriverVehicle> = async (data) => {
    if (!data) return;

    try {
      const driverId = Number(data.driverId);
      const vehicleId = Number(data.vehicleId);

      if (!driverId || !vehicleId) {
        console.error("Driver or vehicle not found");
        return;
      }

      await createAssignment({ driverId, vehicleId });
      fireSuccessToast("The vehicle was assigned");
      revalidateTags([
        `/vehicles/without-driver/${driver}`,
        "drivers/driver-vehicles",
        "drivers",
        "vehicles",
      ]);
      redirects("/drivers");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (driver) {
        setLoading(true);
        try {
          const data = await getVehiclesWithoutDriver(String(driver));

          if (data.success) {
            const vehicleOpts = data.data.vehicles.map((vehicle) => ({
              value: String(vehicle.id),
              label: ` ${capitalize(vehicle.brand)} ${capitalize(
                vehicle.model
              )} ${vehicle.domain.toUpperCase()}`,
              name: ` ${capitalize(vehicle.brand)} ${capitalize(
                vehicle.model
              )} ${vehicle.domain.toUpperCase()}`,
            }));
            setVehicleOptions(vehicleOpts);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [driver]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-primary">Assign Vehicle</DialogTitle>
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
                    setDriver(field.value);
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
        {driver && vehicleOptions && !loading && (
          <FormVehicle vehicleOptions={vehicleOptions} setValue={setValue} />
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

interface VehicleOption {
  label: string;
  value: string;
  name?: string;
}

interface FormVehicleProps {
  vehicleOptions: VehicleOption[];
  setValue: UseFormSetValue<DriverVehicle>;
}

export const FormVehicle: FC<FormVehicleProps> = ({
  vehicleOptions,
  setValue,
}) => {
  const handleChange = (e: number) => {
    if (e) {
      setValue("vehicleId", e);
    }
  };
  return (
    <FormItem className={"mb-4"}>
      <FormLabel className={"font-bold"}>Select Vehicle</FormLabel>
      <FormControl>
        <>
          <SelectInput
            key={vehicleOptions?.find((option) => option.name)?.name}
            options={vehicleOptions}
            onChange={handleChange}
          />
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CreateAssignment;
