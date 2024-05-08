import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./columns";
import { buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { PageProps } from "@/types/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getDrivers } from "@/service/api.service";
import { type Driver } from "@/types/drivers";

export enum Status {
  aprove,
  notApruve,
}

export default async function Drivers({ searchParams }: PageProps) {
  const res = await getDrivers();

  let data: Driver[] = [];
  if (res.success) {
    data = res.data.drivers;
  }

  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";

  return (
    <Container className="sm:px-5">
      <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <h2 className="page-title text-primary">Drivers</h2>
        <div className="flex gap-4 items-center w-full sm:w-auto sm:flex-row flex-col">
          <div className="gap-4 flex ">
            <Link
              href={`/drivers/add-driver`}
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
              Add Driver
            </Link>
            <Link
              href={`/drivers/add-assignment`}
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
              Assign Vehicle
            </Link>
            <SearchBar to={`/drivers`} placeholder="Search a driver" />
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filter={"lastName"}
        searchBy={searchBy}
        href={`/drivers/driver`}
      />
    </Container>
  );
}
