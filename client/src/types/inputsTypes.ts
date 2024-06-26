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
  type: string;
  props?: {
    data?: Array<string>;
    options?: Array<{ label: string; value: string; name?: string }>;
    required?: boolean;
    helperText?: string;
  };
}
