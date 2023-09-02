import { CreateOrder } from "./CreateOrder"
import { Overview } from "./Overview"
import { RecentSalesCard } from "./SwapOrderHistory"
import { UserMintHistory } from "./UserMintHistory"

export const OrderSection = () => {
  return (
    <div className="grid gap-4  grid-cols-2">
      <Overview/>

      <RecentSalesCard />

    </div>
  )
}
