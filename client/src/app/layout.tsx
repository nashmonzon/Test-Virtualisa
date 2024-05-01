import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav-bar";
import { Toaster } from "sonner";

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
      <body className={raleway.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
