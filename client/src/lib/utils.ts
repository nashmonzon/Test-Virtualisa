import { type ClassValue, clsx } from "clsx";
import { ExternalToast, toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string): string {
  if (!word) {
    return "";
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const fireSuccessToast = (message: string, config?: ExternalToast) =>
  toast.success("Success 🎉", { ...config, description: message });

export const fireMessageToast = (message: string, description: string) =>
  toast.message(message, { description });
