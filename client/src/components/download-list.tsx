"use client";

import { downloadXlsx, fireErrorToast, fireSuccessToast } from "@/lib/utils";
import Tooltip from "./ui/tooltip";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { Icons } from "./icons";
import { getTrips } from "@/service/api.service";
import { Trip } from "@/types/trips";
import { formatDate } from "@/lib/dates";
import { useState } from "react";

function DownloadList() {
  const [loading, setLoading] = useState<boolean>();
  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await getTrips();
      if (res.success === false) {
        return fireErrorToast();
      }

      const trips = res.data.trips;
      if (trips.length === 0) {
        fireErrorToast("No trips available for download");
        return;
      }

      const cleanedData = res.data.trips.map((trip: Trip) => ({
        id: trip.id,
        Date: formatDate(trip.startDate),
        "First name": trip.driver.firstName,
        "Last name": trip.driver.lastName,
        "Total Km": `${trip.distance} Km`,
        Brand: trip.vehicle.brand,
        Model: trip.vehicle.model,
        Plate: trip.vehicle.domain,
        "Total amount": `$ ${trip.totalPrice}`,
      }));
      downloadXlsx(cleanedData, "Trips");
      fireSuccessToast("Users list downloaded successfully");
    } catch (e) {
      //@ts-expect-error
      fireErrorToast(e?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tooltip content="Download Trips list">
      <Button onClick={handleDownload} type={"button"} variant={"outline"}>
        {loading ? (
          <Loader2 className="size-6 animate-spin text-primary" />
        ) : (
          <Icons.downloadCloud />
        )}
      </Button>
    </Tooltip>
  );
}

export default DownloadList;
