import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkerBar } from "@tremor/react";

export const RecentSalesCard = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Last Orders</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <RecentSales />
      </CardContent>
    </Card>
  )

}
function RecentSales() {
  const salesData = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "https://ui.shadcn.com/avatars/03.png",
      fallback: "OM",
      amount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "https://ui.shadcn.com/avatars/02.png",
      fallback: "JL",
      amount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "https://ui.shadcn.com/avatars/01.png",
      fallback: "IN",
      amount: "+$299.00",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      avatar: "https://ui.shadcn.com/avatars/04.png",
      fallback: "WK",
      amount: "+$99.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "https://ui.shadcn.com/avatars/05.png",
      fallback: "SD",
      amount: "+$39.00",
    },
  ];
  const item = {
      title: "Customers",
      metric: "1,234",
      value: 40,
      minMetric: "926",
      minValue: 30,
      maxMetric: "2,098",
      maxValue: 68,
    }
  

  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div key={sale.email} className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={sale.avatar} alt="Avatar" />
              <AvatarFallback>{sale.fallback}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none -ml-2.5">+$130</p>
              <p className="text-sm text-muted-foreground">ETH</p>
            </div>
          </div>
          <div className="px-8 w-full">
            <MarkerBar
              value={item.value}
              minValue={item.minValue}
              maxValue={item.maxValue}
              markerTooltip={`${item.value}%`}
              rangeTooltip={`${item.minMetric} (${item.minValue}%)
                                - ${item.maxMetric} (${item.maxValue}%)`}
            />
          </div>
          <div className="grid justify-items-end spacey-y-1">
            <p className="text-sm font-medium leading-none">-$130</p>
            <p className="text-sm text-muted-foreground">USDC</p>
          </div>
        </div>
      ))}
    </div>
  );
}
