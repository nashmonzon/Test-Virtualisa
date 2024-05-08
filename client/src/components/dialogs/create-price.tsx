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
import { createPrice, createVehicle } from "@/service/api.service";
import { fireErrorToast, fireSuccessToast } from "@/lib/utils";
import InputWrapper from "../inputs-wrapper";

import { Price } from "@/types/price";

function CreatePrice() {
  const form = useForm<Price>({});
  const { handleSubmit } = form;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Price> = async (data) => {
    if (!data) return;
    setLoading(true);

    try {
      const requestBody = {
        pricePerKm: Number(data.pricePerKm),
      };
      const res = await createPrice(requestBody);

      if (res.success) {
        fireSuccessToast("Price per Km was changed!");
        revalidateTags(["/price/stats", "price"]);
        redirects("/");
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
          <DialogTitle className="text-primary">Add Price</DialogTitle>
        </DialogHeader>
        <Separator className="my-2" />
        {PRICE_REGISTER.map(({ name, label, type, props }) => {
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

export const PRICE_REGISTER: InputType<keyof Price>[] = [
  {
    label: "Price per Km",
    name: "pricePerKm",
    type: INPUTS_TYPES.Number,
    props: { required: true },
  },
];

export default CreatePrice;
