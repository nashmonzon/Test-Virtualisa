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
import { Separator } from "../ui/separator";
import { redirects, revalidateTags } from "@/service/action.service";
import { createVehicle } from "@/service/api.service";
import { fireErrorToast, fireSuccessToast } from "@/lib/utils";
import InputWrapper from "../inputs-wrapper";
import { Vehicle } from "@/types/vehicles";

function CreateVehicle() {
  const form = useForm<Vehicle>({});
  const { handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Vehicle> = async (data) => {
    if (!data) return;

    const missingFields = VEHICLE_REGISTER.filter((field) => {
      return field.props?.required && !data[field.name];
    });

    if (missingFields.length > 0) {
      fireErrorToast("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const domain = data?.domain?.toLowerCase();

    try {
      const requestBody = {
        domain,
        brand: data.brand,
        model: data.model,
      };
      const res = await createVehicle(requestBody);

      if (res.success) {
        fireSuccessToast("Vehicle was added!");
        revalidateTags(["vehicles", "drivers"]);
        redirects("/vehicles");
      } else {
        fireErrorToast(`${res.message}`);
      }
    } catch (error) {
      fireErrorToast(`${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-primary">Add Vehicle</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {VEHICLE_REGISTER.map(({ name, label, type, props }) => {
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
        })}

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

export const VEHICLE_REGISTER: InputType<keyof Vehicle>[] = [
  {
    label: "Plate",
    name: "domain",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },
  {
    label: "Brand",
    name: "brand",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },
  {
    label: "Model",
    name: "model",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },
];

export default CreateVehicle;
