import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Vehicles } from "./columns";

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

export default async function Vehicles() {
  const data = await getData();
  return (
    <Container>
      <div className="mb-5 flex flex-col items-center justify-between gap-2 sm:flex-row mt-4">
        <h2 className="page-title">Vehicles</h2>
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
