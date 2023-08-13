'use client'

import { Metadata } from "next"
import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { playlists } from "./data/playlists"
import { Sidebar } from "./components/sidebar"
import { TopBar } from "./components/top-bar"
import LineChartTabs from "./charts/LineChartTabs"
import { OrderSection } from "./components/OrderSection"
import { CreateOrder } from "./components/OrderSection/CreateOrder"
import { BuySell } from "./components/buy-sell"
import { RecentSalesCard } from "./components/OrderSection/SwapOrderHistory"
import { useAtom } from "jotai"
import { selectedPairAtom } from "@/atoms/selectedPairAtom"
import { CURRENCY_PAIRS } from "@/constants"


const sidebarNavItems = [
  {
    title: "Liquidity",
    href: "/music",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
]

// export const metadata: Metadata = {
//   title: "Music App",
//   description: "Example music app using the components.",
// }

export default function MusicPage() {

  const [selectedPair, setSelectedPair] = useAtom(selectedPairAtom);
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <TopBar />
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid grid-cols-[380px_1fr] ">
              <CreateOrder />
              <div className="lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue={selectedPair} className="h-full space-y-6" onChange={setSelectedPair}>
                    <div className="space-between flex items-center">
                      <TabsList>
                        {Object.keys(CURRENCY_PAIRS).map(pair => (
                          <TabsTrigger key={pair} value={pair} className="relative">
                            {pair}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Add Pool
                        </Button>
                      </div>
                    </div>
                    {Object.keys(CURRENCY_PAIRS).map(pair => (
                      <TabsContent key={pair} value={pair} className="border-none p-0 outline-none">
                        <div className="space-y-6">
                          <div className="grid gap-2 lg:grid-cols-6">
                            <LineChartTabs />
                          </div>
                          <OrderSection />
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
