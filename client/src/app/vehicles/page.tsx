import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Vehicles } from "./columns";
import { PageProps } from "@/types/types";
import { buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getData(): Promise<Vehicles[]> {
  return [
    {
      id: "1",
      domain: "ABC123",
      brand: "Toyota",
      model: "Corolla",
      mileage: 50000,
      status: "active",
    },
    {
      id: "2",
      domain: "XYZ456",
      brand: "Honda",
      model: "Civic",
      mileage: 75000,
      status: "inactive",
    },
    {
      id: "3",
      domain: "DEF789",
      brand: "Ford",
      model: "Focus",
      mileage: 60000,
      status: "active",
    },
    {
      id: "4",
      domain: "GHI012",
      brand: "Chevrolet",
      model: "Malibu",
      mileage: 80000,
      status: "inactive",
    },
    {
      id: "5",
      domain: "JKL345",
      brand: "Nissan",
      model: "Altima",
      mileage: 70000,
      status: "active",
    },
  ];
}

export default async function Vehicles({ searchParams }: PageProps) {
  const data = await getData();
  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";
  return (
    <Container>
      <div className="mb-5  flex items-center justify-between gap-2  mt-4">
        <h2 className="page-title text-primary">VEHICLES</h2>
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
