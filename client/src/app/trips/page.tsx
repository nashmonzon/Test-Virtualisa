import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Trips } from "./columns";
import Container from "@/components/ui/container";

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

export default async function Trips() {
  const data = await getData();
  return (
    <Container>
      <div className="mb-5 flex flex-col items-center justify-between gap-2 sm:flex-row mt-4">
        <h2 className="page-title">Trips</h2>
      </div>
      <DataTable
        columns={columns}
        data={data}
        filter={"lastName"}
        placeholder="Search a Last name"
      />
    </Container>
  );
}
