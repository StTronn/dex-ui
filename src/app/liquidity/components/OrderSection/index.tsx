'use client';
import { useGetUserLiquidity } from "@/api/useGetUserLiquidity";
import { Overview } from "./Overview"
import { RecentSalesCard } from "./SwapOrderHistory"

export const OrderSection = () => {

  return (
    <div className="grid gap-4  grid-cols-2">
      <Overview />

      <RecentSalesCard />

    </div>
  )
}
