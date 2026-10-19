import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar";

export interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8 text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="mx-auto max-w-7xl">
        <header>
          <Navbar />
        </header>

        <main className="mt-6 md:mt-8">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
}
