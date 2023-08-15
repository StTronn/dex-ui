import { CreateOrder } from "./CreateOrder"
import { Overview } from "./Overview"
import { RecentSalesCard } from "./SwapOrderHistory"
import { TradeHistoryUserCard } from "./TradeHistoryUser"

export const OrderSection = () => {
  return (
    <div className="grid gap-4  grid-cols-2">

      <TradeHistoryUserCard />
      <RecentSalesCard />
      <Overview />

    </div>
  )
}
