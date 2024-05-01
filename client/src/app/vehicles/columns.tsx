"use client";

import { Badge } from "@/components/ui/badge";
import SortBtn from "@/components/ui/button-sort";
import { capitalize } from "@/lib/utils";
import { VehicleStatus } from "@/types/enums";
import { Vehicle } from "@/types/vehicles";
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

export const columns: ColumnDef<Vehicle>[] = [
  {
    accessorKey: "domain",
    header: () => {
      return <div className="px-4">Plate</div>;
    },

    cell: ({ row }) => {
      const value = row.original;
      const domain = value.domain.toUpperCase();
      return <div className="p-4 font-medium">{domain}</div>;
    },
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return <SortBtn label="Brand" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original.brand;
      const brand = capitalize(value);

      return <div className="p-4 font-medium">{brand}</div>;
    },
  },

  {
    accessorKey: "model",
    header: ({ column }) => {
      return <SortBtn label="Model" column={column} />;
    },
    cell: ({ row }) => {
      const value = row.original.model;
      const model = capitalize(value);
      return <div className="p-4 font-medium">{model}</div>;
    },
  },
  {
    accessorKey: "mileage",
    header: () => {
      return <div className="px-4">Km</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className=" font-medium">{value.mileage} Km</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => {
      return <div className="px-4">Status</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return (
        <Badge
          variant={`${
            value.status === VehicleStatus.IN_REPAIR ? "destructive" : "success"
          }`}
          className="font-medium"
        >
          {value.status}
        </Badge>
      );
    },
  },
];
