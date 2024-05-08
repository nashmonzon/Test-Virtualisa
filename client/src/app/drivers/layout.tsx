import NavBar from "@/components/nav-bar";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}
export default function DriverLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <NavBar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
