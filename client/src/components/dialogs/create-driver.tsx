"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";

import { DialogHeader } from "../ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input as InputType, INPUTS_TYPES } from "@/types/inputsTypes";
import InputsWrapper from "../inputs-wrapper";
import { Drivers } from "@/app/drivers/columns";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

function CreateDriver() {
  const form = useForm<Drivers>({});
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Drivers> = async (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Add driver</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />

        {/* <Label htmlFor={"change-project-owner"}>Email</Label>
      <Input
        id={"change-project-owner"}
        placeholder={"hello@smat.io"}
        {...register("email", { required: true })}
      /> */}

        {INVESTOR_REGISTER.map(({ name, label, props }) => {
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

export const INVESTOR_REGISTER: InputType<keyof Drivers>[] = [
  {
    label: "First name",
    name: "firstName",
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    label: "Last name",
    name: "lastName",
    props: { type: INPUTS_TYPES.Text, required: true },
  },
  {
    label: "Dni",
    name: "dni",
    props: { type: INPUTS_TYPES.Phone, required: true },
  },

  {
    label: "License Type",
    name: "licenseType",
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
  {
    label: "License Expiry",
    name: "licenseExpiry",
    props: {
      type: INPUTS_TYPES.Text,
      required: true,
    },
  },
];

export default CreateDriver;
