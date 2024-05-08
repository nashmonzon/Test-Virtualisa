import { LicenseType, Status } from "@/types/enums";
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

export const formatNumber = (number: number) => {
  const format =
    typeof window === "undefined" ? "en-US" : navigator?.language ?? "en-US";
  return new Intl.NumberFormat(format, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(number);
};

export function getLicenseStatus(
  licenseExpiry: string,
  licenseType: LicenseType
): string {
  const currentDate = new Date();
  const licenseExpiryDate = new Date(licenseExpiry);
  const differenceInMilliseconds =
    currentDate.getTime() - licenseExpiryDate.getTime();

  const differenceInYears =
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365);

  let status = "";
  if (licenseType === LicenseType.PERSONAL) {
    if (differenceInYears > 1) {
      status = Status.PROHIBITED;
    } else {
      status = Status.ALLOWED;
    }
  } else if (licenseType === LicenseType.PROFESSIONAL) {
    if (differenceInYears > 5) {
      status = Status.PROHIBITED;
    } else {
      status = Status.ALLOWED;
    }
  }
  return status;
}

export const calculateTotalDistance = ({ trips }: { trips: Trip[] }) => {
  let totalDistance = 0;
  trips.forEach((trip) => {
    totalDistance += trip.distance;
  });
  return totalDistance;
};
