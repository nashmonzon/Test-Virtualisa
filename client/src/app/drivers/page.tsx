import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Drivers } from "./columns";
import { Button, buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { PageProps } from "@/types/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
export enum LicenseType {
  PERSONAL,
  PROFESSIONAL,
}
export enum Status {
  aprove,
  notApruve,
}

export async function getData(): Promise<Drivers[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      dni: "123456789",
      distance: 1000,
      licenseType: "PERSONAL",
      licenseExpiry: "2025-12-31",
      status: "aprove",
    },
    {
      id: "2",
      firstName: "Alice",
      lastName: "Smith",
      dni: "987654321",
      distance: 1500,
      licenseType: "PROFESSIONAL",
      licenseExpiry: "2024-10-15",
      status: "notApruve",
    },
    {
      id: "3",
      firstName: "Bob",
      lastName: "Johnson",
      dni: "456789123",
      distance: 2000,
      licenseType: "PERSONAL",
      licenseExpiry: "2023-08-20",
      status: "aprove",
    },
    {
      id: "4",
      firstName: "Emily",
      lastName: "Brown",
      dni: "321654987",
      distance: 1800,
      licenseType: "PROFESSIONAL",
      licenseExpiry: "2026-05-05",
      status: "notApruve",
    },
    {
      id: "5",
      firstName: "Michael",
      lastName: "Davis",
      dni: "654321987",
      distance: 2200,
      licenseType: "PERSONAL",
      licenseExpiry: "2023-11-30",
      status: "aprove",
    },
  ];
}

export default async function Drivers({ searchParams }: PageProps) {
  const data = await getData();
  const id = searchParams?.id ? String(searchParams.id) : "";
  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";

  return (
    <Container className="sm:px-5">
      <div className="mb-5  flex items-center justify-between gap-2  mt-4">
        <h2 className="page-title text-primary">DRIVERS</h2>
        <div className="flex gap-4 items-center">
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

          <SearchBar to={`/drivers`} placeholder="Search a driver" />
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
