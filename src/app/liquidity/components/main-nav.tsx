'use client'
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/trade">
        <div
          className={
            typeof window !== 'undefined' && window.location.pathname === "/trade"
              ? "text-sm font-medium transition-colors text-primary"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          }
        >
          Trade
        </div>
      </Link>
      <Link href="/liquidity">
        <div
          className={
            typeof window !== 'undefined' && window.location.pathname === "/liquidity"
              ? "text-sm font-medium transition-colors text-primary"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          }
        >
          Liquidity
        </div>
      </Link>
      {/* ... Similar logic for the other links ... */}
      <Link href="/balances">
        <div
          className={
            typeof window !== 'undefined' && window.location.pathname === "/balance"
              ? "text-sm font-medium transition-colors text-primary"
              : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          }
        >
          Portfolio
        </div>
      </Link>
    </nav>
  );
}
