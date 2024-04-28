"use client";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathanme = usePathname();
  return (
    <div className="flex gap-4">
      {Object.keys(links).map((key) => {
        return (
          <Link
            key={key}
            href={links[key]}
            prefetch
            className={cn(
              "capitalize",
              pathanme?.includes(key) && "bg-[#ac5b96]",
              buttonVariants({
                size: "sm",
                variant: "ghost",
              })
            )}
          >
            {key}
          </Link>
        );
      })}
    </div>
  );
};

interface Links {
  [key: string]: string;
}
const links: Links = {
  trips: "/trips",
  drivers: "/drivers",
  vehicles: "/vehicles",
};

export default Navlinks;
