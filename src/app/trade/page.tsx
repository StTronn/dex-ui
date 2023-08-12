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
export const metadata: Metadata = {
  title: "Music App",
  description: "Example music app using the components.",
}

export default function MusicPage() {
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
            <div className="grid lg:grid-cols-6 ">
              <Sidebar playlists={playlists} />
              <div className="col-span-3 lg:col-span-5 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="price" className="relative">
                          RUPI/USDC
                        </TabsTrigger>
                        <TabsTrigger value="INR/USDC" className="relative">
                          INR/USDC
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                        <TabsTrigger value="live" disabled>
                          Live
                        </TabsTrigger>

                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Add Pool
                        </Button>
                      </div>
                    </div>
                    <TabsContent value="price">
                      <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-6">
                          <LineChartTabs />
                          <CreateOrder />
                        </div>
                        <OrderSection />
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="INR/USDC"
                      className="border-none p-0 outline-none"
                    >
                      <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-6">
                          <LineChartTabs />
                          <CreateOrder />
                        </div>
                        <OrderSection />
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-6">
                          <LineChartTabs />
                          <CreateOrder />
                        </div>
                        <OrderSection />
                      </div>
                    </TabsContent>
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
