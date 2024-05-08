"use client";

import { Trip } from "@/types/trips";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function Overview({ trips }: { trips: Trip[] }) {
  const tripCounts = countTripsByMonth(trips);

  const data = Object.keys(tripCounts).map((month) => ({
    name: month,
    total: tripCounts[month],
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface MonthlyTripCount {
  [month: string]: number;
}

export function countTripsByMonth(trips: Trip[]): MonthlyTripCount {
  const tripCounts: MonthlyTripCount = {};

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  months.forEach((month) => (tripCounts[month] = 0));

  trips.forEach((trip) => {
    const startDate = new Date(trip.startDate);
    const month = startDate.toLocaleString("en-US", { month: "short" });
    tripCounts[month]++;
  });

  return tripCounts;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover rounded border">
        {payload.map((pld: any) => (
          <div style={{ display: "inline-block", padding: 10 }}>
            <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
              <div className="bar" style={{ background: pld.fill }} />
              <div style={{ fontWeight: 600 }}>{pld.payload.name} :</div>
            </div>
            <div>{pld.value} Trips</div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
