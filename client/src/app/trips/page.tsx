import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Trips } from "./columns";
import Container from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { PageProps } from "@/types/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getTrips } from "@/service/api.service";
import { Trip } from "@/types/trips";

async function getData(): Promise<Trips[]> {
  // Fetch data from your API here.
  return [
    {
      id: "dsajdshakds",
      startDate: "2024-04-01",
      distance: 150,
      firstName: "John",
      lastName: "Doe",
      brand: "Toyota",
      model: "Corolla",
      domain: "ABC123",
    },
    {
      id: "dsajdsha",
      startDate: "2024-04-05",
      distance: 200,
      firstName: "Jane",
      lastName: "Smith",
      brand: "Honda",
      model: "Civic",
      domain: "XYZ456",
    },
    {
      id: "dsajdshakd",
      startDate: "2024-04-10",
      distance: 180,
      firstName: "Michael",
      lastName: "Johnson",
      brand: "Ford",
      model: "Fusion",
      domain: "DEF789",
    },
    {
      id: "dsa",
      startDate: "2024-04-15",
      distance: 220,
      firstName: "Emily",
      lastName: "Brown",
      brand: "Chevrolet",
      model: "Malibu",
      domain: "GHI012",
    },
    {
      id: "dsajd2",
      startDate: "2024-04-20",
      distance: 190,
      firstName: "Daniel",
      lastName: "Martinez",
      brand: "Nissan",
      model: "Sentra",
      domain: "JKL345",
    },
    {
      id: "dsa3",
      startDate: "2024-04-25",
      distance: 210,
      firstName: "Sophia",
      lastName: "Garcia",
      brand: "Hyundai",
      model: "Elantra",
      domain: "MNO678",
    },
  ];
}

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
            href={`/trip/add-trip`}
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
          <SearchBar to={`/trips`} placeholder="Search a driver" />
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
