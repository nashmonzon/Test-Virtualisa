"use client";

import { Badge } from "@/components/ui/badge";
import SortBtn from "@/components/ui/button-sort";
import { formatDate } from "@/lib/dates";
import { capitalize, getLicenseStatus } from "@/lib/utils";
import { Driver } from "@/types/drivers";
import { Status } from "@/types/enums";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Driver>[] = [
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
    accessorKey: "kilometers",
    header: () => {
      return <div className="">Total Km</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className=" font-medium">{value.kilometers ?? 0} KM</div>;
    },
  },
  {
    accessorKey: "licenseType",
    header: () => {
      return <div className="px-4">License Type</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return (
        <div className="p-4 font-medium">
          {capitalize(value.licenseType.toLowerCase())}
        </div>
      );
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
      return <div className="">Aviable to drive?</div>;
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
