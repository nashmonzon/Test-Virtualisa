"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function ThemeToggle({ className = "" }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        className,
        "frex-row flex h-11 flex-1 items-center justify-start gap-2 px-0 sm:px-4"
      )}
    >
      <Icons.sun className="dark:hidden" />
      <Icons.moon className="hidden dark:inline" />
      <span className="text-lg sm:sr-only">Toggle theme</span>
    </Button>
  );
}
