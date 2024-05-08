import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { PageProps } from "@/types/types";
import { buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getVehicles } from "@/service/api.service";
import { Vehicle } from "@/types/vehicles";

export default async function Vehicles({ searchParams }: PageProps) {
  const res = await getVehicles();

  let data: Vehicle[] = [];
  if (res.success) {
    data = res.data.vehicles;
  }

  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";
  return (
    <Container>
      <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h2 className="page-title text-primary">Vehicles</h2>
        <div className="flex gap-4 items-center">
          <Link
            href={`/vehicles/add-vehicle`}
            className={cn(
              "capitalize",
              "hover:text-primary-foreground",
              "bg-[#ac5b96] text-primary-foreground",
              buttonVariants({
                size: "sm",
                variant: "ghost",
              })
            )}
          >
            Add Vehicles
          </Link>
          <SearchBar to={`/vehicles`} placeholder="Search a Plate" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filter={"domain"}
        searchBy={searchBy}
      />
    </Container>
  );
}
