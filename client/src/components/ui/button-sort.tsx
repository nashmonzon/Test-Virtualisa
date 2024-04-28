import { Column } from "@tanstack/react-table";
import React from "react";
import { Button } from "./button";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export function SortBtn<T>({
  label,
  column,
}: {
  label: string;
  column: Column<T, unknown>;
}) {
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <Icons.arrowSort className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
}

export default SortBtn;
