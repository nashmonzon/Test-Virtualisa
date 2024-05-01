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
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { type Vehicles } from "@/app/vehicles/columns";
import { redirects, revalidateTags } from "@/service/action.service";
import { createVehicle } from "@/service/api.service";
import { fireSuccessToast } from "@/lib/utils";
import { toast } from "sonner";

function CreateVehicle() {
  const form = useForm<Vehicles>({});
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Vehicles> = async (data) => {
    if (!data) return;

    try {
      const requestBody = {
        domain: data.domain,
        brand: data.brand,
        model: data.model,
      };
      const res = await createVehicle(requestBody);

      if (!res.success) {
        return;
      }
      fireSuccessToast("Vehicle was added!");
      revalidateTags("vehicles");
      redirects("/vehicles");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {VEHICLE_REGISTER.map(({ name, label, props }) => {
          const { type, data, required } = props || {};

          return (
            <FormField
              key={name}
              control={form.control}
              name={name || "ERROR_MISSING_INPUT_NAME"}
              render={({ field }) => (
                <FormItem className={"mb-4"}>
                  <FormLabel className={"font-bold"}>{label}</FormLabel>

                  <FormControl>
                    {/* @ts-expect-error too many props */}
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <div className="mt-6 flex justify-between">
          <button
            onClick={() =>
              toast.success("This is a sonner toast", {
                className: "bg-success text-white",
              })
            }
          >
            Render my toast
          </button>

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

export const VEHICLE_REGISTER: InputType<keyof Vehicles>[] = [
  {
    label: "Plate",
    name: "domain",
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    label: "Brand",
    name: "brand",
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    label: "Model",
    name: "model",
    props: { type: INPUTS_TYPES.Phone, required: true },
  },
];

export default CreateVehicle;
