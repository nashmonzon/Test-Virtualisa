"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      initialFocus
      captionLayout="dropdown-buttons"
      fromYear={2010}
      toYear={2035}
      classNames={{
        months:
          "flex flex-1 flex-col sm:flex-row space-y-6 sm:space-x-4 sm:space-y-0",
        dropdown:
          "flex h-8 w-full items-center justify-between rounded-md bg-transparent py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        dropdown_icon: "hidden",
        caption_dropdowns: "flex gap-4 mx-12",
        dropdown_month: "flex items-center gap-1 min-w-[6ch] [&>span]:hidden",
        dropdown_year: "flex items-center gap-1 min-w-[6ch] [&>span]:hidden",
        month: "text-sm flex-1 space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex flex-1",
        head_cell:
          "flex-1 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex flex-1 w-full mt-2",
        cell: "flex-1 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-muted first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-full p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-muted text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="size-4" />,
        IconRight: () => <ChevronRight className="size-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

React.memo(Calendar);

export { Calendar };
