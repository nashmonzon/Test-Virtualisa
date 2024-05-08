import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Trips } from "./columns";
import Container from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { PageProps } from "@/types/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTrips } from "@/service/api.service";
import { Trip } from "@/types/trips";
import DownloadList from "@/components/download-list";

export default async function Trips({ searchParams }: PageProps) {
  const res = await getTrips();
  let trips: Trip[] = [];
  if (res.success) {
    trips = res.data.trips;
  }

  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";
  return (
    <Container>
      <div className="mb-5  flex items-center justify-between gap-2  mt-4">
        <h2 className="page-title text-primary">TRIPS</h2>
        <div className="flex gap-4 items-center">
          <Link
            href={`/trips/add-trip`}
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
            New Trip
          </Link>
          <DownloadList />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={trips}
        filter={"lastName"}
        searchBy={searchBy}
      />
    </Container>
  );
}
