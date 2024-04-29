import React from "react";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputsWrapper {
  nextStep?: () => void;
  name: string;
  label?: string;
  type?: string;
  data?: string[];
  control?: Control<any>;
  errors?: string | any; // TODO!: FIX!
  editable?: boolean;
  getValues?: () => void;
  setValue?: UseFormSetValue<any>;
  watch?: UseFormWatch<any>;
  required?: boolean;
  helperText?: string;
}

const InputsWrapper = ({ ...props }: InputsWrapper) => {
  return <Input {...props} />;
};

export default InputsWrapper;
