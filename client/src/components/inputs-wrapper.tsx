import React from "react";

import { Input } from "./ui/inputs/input";

import { INPUTS_TYPES } from "@/types/inputsTypes";
import DateInput from "./ui/inputs/date-input";
import SelectInput from "./ui/inputs/select-input";

//@ts-expect-error
export default function InputWrapper({ type, props, ...field }) {
  if (!type) return null;

  if (type === INPUTS_TYPES.Date) {
    return <DateInput {...field} />;
  }
  if (type === INPUTS_TYPES.Select) {
    let { options } = props;

    if (!options || !options.length) {
      options = [{ label: "No options", value: "no-options" }];
    }

    return <SelectInput options={options} {...field} />;
  }
  return <Input {...field} />;
}
