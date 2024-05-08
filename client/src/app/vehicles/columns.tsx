"use client";

import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SortBtn from "@/components/ui/button-sort";
import Tooltip from "@/components/ui/tooltip";
import { capitalize, fireErrorToast } from "@/lib/utils";
import { revalidateTags } from "@/service/action.service";
import { repairCard } from "@/service/api.service";
import { VehicleStatus } from "@/types/enums";
import { Vehicle } from "@/types/vehicles";
import { ColumnDef } from "@tanstack/react-table";

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
    accessorKey: "kilometers",
    header: () => {
      return <div className="px-4">Km</div>;
    },
    cell: ({ row }) => {
      const value = row.original;

      return <div className=" font-medium">{value.kilometers} Km</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortBtn label="Status" column={column} />;
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
  {
    header: () => {
      return <div className="">Repair</div>;
    },
    id: "actions",
    cell: ({ row }) => {
      const value = row.original;

      const handleRepair = async () => {
        try {
          const res = await repairCard(value.id);
          if (res.success) {
            revalidateTags(["vehicles"]);
          }
        } catch (error) {
          fireErrorToast(`${error}`);
        }
      };
      return (
        <>
          <Tooltip content="Repair the car">
            <Button
              size="sm"
              variant="ghost"
              disabled={value.status === VehicleStatus.AVAILABLE}
              onClick={() => handleRepair()}
            >
              <Icons.wrench className="" />
            </Button>
          </Tooltip>
        </>
      );
    },
  },
];
