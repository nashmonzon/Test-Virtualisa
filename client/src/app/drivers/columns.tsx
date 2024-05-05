"use client";

import { Badge } from "@/components/ui/badge";
import SortBtn from "@/components/ui/button-sort";
import { formatDate } from "@/lib/dates";
import { capitalize } from "@/lib/utils";
import { Driver } from "@/types/drivers";
import { ColumnDef } from "@tanstack/react-table";

export interface ExtendedDriver extends Driver {
  status: string;
}
enum LicenseType {
  PERSONAL = "PERSONAL",
  PROFESSIONAL = "PROFESSIONAL",
}

enum Status {
  PROHIBITED = "Prohibited",
  ALLOWED = "Allowed",
}

export const columns: ColumnDef<ExtendedDriver>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <SortBtn label="First Name" column={column} />;
    },

    cell: ({ row }) => {
      const value = row.original;
      const firstName = capitalize(value.firstName);

      return <div className="p-4 font-medium">{firstName}</div>;
    },
  },

  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return <SortBtn label="Last Name" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original;
      const lastName = capitalize(value.lastName);
      return <div className="p-4 font-medium">{lastName}</div>;
    },
  },
  {
    accessorKey: "dni",
    header: () => {
      return <div className="px-4">Dni</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.dni}</div>;
    },
  },
  {
    accessorKey: "kilomiters",
    header: () => {
      return <div className="px-4">Total Km</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className=" font-medium">{value.kilomiters ?? 0} KM</div>;
    },
  },
  {
    accessorKey: "licenseType",
    header: () => {
      return <div className="px-4">License Type</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.licenseType}</div>;
    },
  },

  {
    accessorKey: "licenseExpiry",
    header: () => {
      return <div className="px-4">License Expiry</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return (
        <div className="p-4 font-medium">{formatDate(value.licenseExpiry)}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="px-4">Status</div>;
    },
    cell: (row) => {
      const value = row.row.original;

      const status = getLicenseStatus(value.licenseExpiry, value.licenseType);

      return (
        <Badge
          variant={`${
            status === Status.PROHIBITED ? "destructive" : "success"
          }`}
          className="font-medium"
        >
          {status}
        </Badge>
      );
    },
  },
];

function getLicenseStatus(
  licenseExpiry: string,
  licenseType: LicenseType
): string {
  const currentDate = new Date();
  const licenseExpiryDate = new Date(licenseExpiry);

  // Calculamos la diferencia en milisegundos
  const differenceInMilliseconds =
    currentDate.getTime() - licenseExpiryDate.getTime();

  // Convertimos la diferencia de milisegundos a años
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
