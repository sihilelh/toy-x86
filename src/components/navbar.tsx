import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FolderGit2, BookOpen, Info, Cpu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/shadcn.utils";

import logo from "@/assets/toy-x86-logo.png";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Projects",
    href: "/projects",
    icon: FolderGit2,
    exact: false,
  },
  {
    name: "References",
    href: "/references",
    icon: BookOpen,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
];

export interface NavbarProps {
  className?: string;
  items?: NavItem[];
}

export default function Navbar({ className, items = NAV_ITEMS }: NavbarProps) {
  const location = useLocation();

  const isItemActive = (item: NavItem) => {
    const currentPath = location.pathname;

    // Special case for Projects: matches "/" as well as "/projects"
    if (item.href === "/projects") {
      return (
        currentPath === "/" ||
        currentPath === "/projects" ||
        currentPath.startsWith("/projects/")
      );
    }

    if (item.exact) {
      return currentPath === item.href;
    }

    return currentPath === item.href || currentPath.startsWith(`${item.href}/`);
  };

  return (
    <Card
      className={cn("overflow-hidden border-2 bg-card shadow-md", className)}
    >
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-3 sm:px-6 sm:py-3.5">
        {/* Logo / Brand */}
        <Link
          to="/projects"
          className="group flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Toy x86 Home"
        >
          {/* <div className="flex size-9 items-center justify-center rounded border-2 border-border bg-primary shadow-xs transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:shadow-sm">
            <Cpu className="size-5 text-primary-foreground stroke-[2.25]" />
          </div> */}

          <div className="flex size-16 items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5">
            <img src={logo} alt="Toy x86 Logo" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 leading-none">
              <span className="font-head text-base font-bold tracking-tight text-foreground">
                toy_x86
              </span>
              <span className="rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono font-medium uppercase text-muted-foreground">
                arch // 32-bit
              </span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              instruction set &amp; lab
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-3">
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-1 rounded border-2 border-border bg-muted/40 p-1 shadow-xs"
          >
            {items.map((item) => {
              const active = isItemActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded border-2 px-3 py-1.5 text-xs sm:text-sm font-head font-medium transition-all select-none",
                    active
                      ? "border-border bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0",
                  )}
                >
                  <Icon className="size-4 shrink-0 stroke-[2.25]" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </CardContent>
    </Card>
  );
}
