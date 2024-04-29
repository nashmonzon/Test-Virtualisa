"use client";

import SortBtn from "@/components/ui/button-sort";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Drivers = {
  id: string;
  firstName: String;
  lastName: String;
  dni: String;
  distance: number;
  licenseType: string;
  licenseExpiry: string;
  status: string;
};

export enum LicenseType {
  PERSONAL,
  PROFESSIONAL,
}
export enum Status {
  aprove,
  notApruve,
}

export const columns: ColumnDef<Drivers>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <SortBtn label="firstName" column={column} />;
    },

    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.firstName}</div>;
    },
  },

  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return <SortBtn label="Last Name" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.lastName}</div>;
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
    accessorKey: "distance",
    header: () => {
      return <div className="px-4">Dni</div>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("distance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
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

      return <div className="p-4 font-medium">{value.licenseExpiry}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="px-4">Status</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.status}</div>;
    },
  },
];
