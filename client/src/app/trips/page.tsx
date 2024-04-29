import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Trips } from "./columns";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/search-bar";
import { PageProps } from "@/types/types";

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
  const data = await getData();
  const searchBy = searchParams?.searchBy ? String(searchParams.searchBy) : "";
  return (
    <Container>
      <div className="mb-5  flex items-center justify-between gap-2  mt-4">
        <h2 className="page-title text-primary">TRIPS</h2>
        <div className="flex gap-4">
          <Button>Add Driver</Button>
          <SearchBar to={`/trips`} placeholder="Search a driver" />
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filter={"lastName"}
        searchBy={searchBy}
      />
    </Container>
  );
}
