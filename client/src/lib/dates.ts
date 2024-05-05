import { DateTime } from "luxon";
export const formatDate = (val: string | Date, format = DateTime.DATE_FULL) => {
  if (typeof val === "string" && val.includes("Z")) {
    return DateTime.fromISO(val).setLocale("en").toLocaleString(format);
  }
  if (val instanceof Date) {
    return DateTime.fromJSDate(val).setLocale("en").toLocaleString(format);
  }
  return val;
};
