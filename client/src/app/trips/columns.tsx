"use client";

import SortBtn from "@/components/ui/button-sort";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Trips = {
  id: string;
  startDate: string;
  distance: number;
  firstName: string;
  lastName: string;
  brand: string;
  model: string;
  domain: string;
};

export const columns: ColumnDef<Trips>[] = [
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return <SortBtn label="Date" column={column} />;
    },

    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.startDate}</div>;
    },
  },
  {
    accessorKey: "distance",
    header: () => <div className="">KM</div>,
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
    accessorKey: "firstName",
    header: ({ column }) => {
      return <SortBtn label="Name" column={column} />;
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
    accessorKey: "brand",
    header: () => {
      return <div className="px-4">Brand</div>;
    },

    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.brand}</div>;
    },
  },
  {
    accessorKey: "model",
    header: () => {
      return <div className="px-4">Model</div>;
    },

    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.model}</div>;
    },
  },
  {
    accessorKey: "domain",
    header: () => {
      return <div className="px-4">Plate</div>;
    },

    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.domain}</div>;
    },
  },
];
