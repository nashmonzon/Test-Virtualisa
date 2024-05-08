import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const raleway = Raleway({ style: ["italic", "normal"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtualisa - Cars",
  description: "Efficient fleet management for Virtualisa-cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          raleway.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
