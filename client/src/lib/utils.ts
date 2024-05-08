import { Trip } from "@/types/trips";
import { type ClassValue, clsx } from "clsx";
import { ExternalToast, toast } from "sonner";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string): string {
  if (typeof word !== "string") {
    return word;
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const fireSuccessToast = (message: string, config?: ExternalToast) =>
  toast.success("Success 🎉", { ...config, description: message });

export const fireMessageToast = (message: string, description: string) =>
  toast.message(message, { description });

export const fireErrorToast = async (message?: string) => {
  toast.error("Something went wrong!", {
    description: message || "",
  });
};

export const downloadXlsx = (data: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
  XLSX.writeFile(wb, fileName ? `${fileName}.xlsx` : "sheetjs.xlsx");
};
