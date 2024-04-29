"use client";

import SortBtn from "@/components/ui/button-sort";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Vehicles = {
  id: string;
  domain: String;
  brand: String;
  model: String;
  mileage: number;
  status: string;
};

export const columns: ColumnDef<Vehicles>[] = [
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
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return <SortBtn label="Brand" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.brand}</div>;
    },
  },

  {
    accessorKey: "model",
    header: ({ column }) => {
      return <SortBtn label="Model" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.model}</div>;
    },
  },
  {
    accessorKey: "mileage",
    header: () => {
      return <div className="px-4">Km</div>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("mileage"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
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
  {
    accessorKey: "caca",
    header: () => {
      return <div className="px-4">Status</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className="p-4 font-medium">{value.status}</div>;
    },
  },
];
