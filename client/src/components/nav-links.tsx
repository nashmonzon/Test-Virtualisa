"use client";
import React, { Fragment } from "react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import { Icons } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ThemeToggle } from "./ui/toggel-theme";

const Navlinks = () => {
  const pathanme = usePathname();
  return (
    <div className="flex gap-4 ">
      <div className="mx-4 hidden flex-1 items-center space-x-1 sm:flex">
        {Object.keys(links).map((key) => {
          return (
            <Link
              key={key}
              href={links[key]}
              prefetch
              className={cn(
                "capitalize",
                "hover:text-primary-foreground",
                pathanme?.includes(key) &&
                  "bg-[#ac5b96] text-primary-foreground",
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
      <div className="flex flex-1 justify-end">
        <span className={"sm:hidden"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Icons.MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <MobileMenu />
          </DropdownMenu>
        </span>
      </div>
    </div>
  );
};

const MobileMenu = ({ className = "" }) => {
  return (
    <DropdownMenuContent
      className={cn("mr-4 mt-3 w-[calc(100vw-2rem)] px-4 sm:hidden", className)}
    >
      <DropdownMenuGroup className="flex flex-col gap-2">
        {Object.entries(links).map(([label, href], index) => {
          if (label === "projects") {
            return (
              <Fragment key={href}>
                <Link key={href} href={href}>
                  <DropdownMenuItem
                    className={cn(
                      index !== 0 && "border-t-2 border-solid border-muted"
                    )}
                  >
                    <span className="text-lg capitalize">Projects</span>
                  </DropdownMenuItem>
                </Link>

                <Link href={"/projects/landing-page"}>
                  <DropdownMenuItem
                    className={cn(
                      index !== 0 && "border-t-2 border-solid border-muted"
                    )}
                  >
                    <span className="text-lg capitalize">
                      Landing page projects
                    </span>
                  </DropdownMenuItem>
                </Link>
              </Fragment>
            );
          }
          return (
            <Link key={href} href={href}>
              <DropdownMenuItem
                className={cn(
                  index !== 0 && "border-t-2 border-solid border-muted"
                )}
              >
                <span className="text-lg capitalize">
                  {label === "ic" ? "Investment Committee" : label}
                </span>
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuGroup>

      <DropdownMenuGroup className="flex flex-col mt-2 gap-2">
        <DropdownMenuItem
          className={cn("h-[50px] border-t-2 border-solid border-muted")}
        >
          <ThemeToggle />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
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
