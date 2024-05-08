"use client";
import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

const CardWrapper = ({
  title,
  description,
  cHdDescription,
  children,
  className,
}: {
  title: string;
  description?: string;
  cHdDescription?: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn("shadow-md", className)}>
      <CardHeader className={cn(cHdDescription)}>
        <CardTitle className="text-md font-bold text-primary">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
