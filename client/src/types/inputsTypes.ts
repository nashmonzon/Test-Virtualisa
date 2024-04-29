export enum INPUTS_TYPES {
  Text = "text",
  Select = "select",
  Date = "date",
  Phone = "phone",
  Number = "number",
  Currency = "currency",
}

export interface Input<T = string> {
  name: T;
  label: string;
  props?: {
    type: string;
    data?: Array<string>;
    required?: boolean;
    helperText?: string;
  };
}
