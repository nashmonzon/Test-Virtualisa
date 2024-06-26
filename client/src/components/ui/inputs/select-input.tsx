"use client";

import React from "react";

import { FormControl } from "../form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "../select";

//@ts-expect-error
function SelectInput({ options, ...field }) {
  const { onChange, value, placeholder, name } = field;

  return (
    <Select
      key={name}
      onValueChange={(v) => onChange?.(v)}
      defaultValue={value}
      {...field}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {options?.map(
            ({
              label,
              value,
              name,
            }: {
              label: string;
              value: string;
              name: string;
            }) => {
              return (
                <>
                  <SelectItem key={value} value={value}>
                    {label || name}
                  </SelectItem>
                </>
              );
            }
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectInput;
