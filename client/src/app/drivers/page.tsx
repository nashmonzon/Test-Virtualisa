import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns, type Drivers } from "./columns";
export enum LicenseType {
  PERSONAL,
  PROFESSIONAL,
}
export enum Status {
  aprove,
  notApruve,
}

async function getData(): Promise<Drivers[]> {
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

export default async function Drivers() {
  const data = await getData();
  return (
    <Container>
      <div className="mb-5 flex flex-col items-center justify-between gap-2 sm:flex-row mt-4">
        <h2 className="page-title">Drivers</h2>
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
