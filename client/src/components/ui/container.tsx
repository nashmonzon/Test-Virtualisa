import { cn } from "@/lib/utils";
import { ReactNode } from "react";

function Container({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <main id={id} className={cn("mx-auto md:container", className)}>
      {children}
    </main>
  );
}

export default Container;
