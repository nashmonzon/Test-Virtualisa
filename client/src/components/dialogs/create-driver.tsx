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
import { Driver } from "@/types/drivers";
import { redirects, revalidateTags } from "@/service/action.service";
import { createDriver } from "@/service/api.service";
import InputWrapper from "../inputs-wrapper";
import { LicenseType } from "@/types/enums";
import { fireSuccessToast } from "@/lib/utils";

function CreateDriver() {
  const form = useForm<Driver>({});
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Driver> = async (data) => {
    if (!data) return;
    console.log(data);

    try {
      const requestBody: Partial<Driver> = {
        firstName: data.firstName,
        lastName: data.lastName,
        dni: data.dni,
        licenseType: data.licenseType,
        licenseExpiry: data.licenseExpiry,
      };
      const res = await createDriver(requestBody);

      if (!res.success) {
        return;
      }
      fireSuccessToast("Driver was added!");
      revalidateTags("drivers");
      redirects("/drivers");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle className="text-primary">Add driver</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {DRIVER_REGISTER.map(({ name, label, type, props }) => {
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

export const LICENCE_TYPE = [
  {
    label: "Personal",
    value: LicenseType.PERSONAL,
  },
  {
    label: "Professional",
    value: LicenseType.PROFESSIONAL,
  },
];

export const DRIVER_REGISTER: InputType<keyof Driver>[] = [
  {
    label: "First name",
    name: "firstName",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },
  {
    label: "Last name",
    name: "lastName",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },
  {
    label: "Dni",
    name: "dni",
    type: INPUTS_TYPES.Text,
    props: { required: true },
  },

  {
    label: "License Type",
    name: "licenseType",
    type: INPUTS_TYPES.Select,
    props: {
      options: LICENCE_TYPE,
      required: true,
    },
  },
  {
    label: "License Expiry",
    name: "licenseExpiry",
    type: INPUTS_TYPES.Date,
    props: {
      required: true,
    },
  },
];

export default CreateDriver;
