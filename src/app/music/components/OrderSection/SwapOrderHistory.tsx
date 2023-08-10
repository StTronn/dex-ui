import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent  } from "@/components/ui/card";

export const RecentSalesCard = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          You made 265 sales this month.
        </CardDescription>
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
      avatar: "/avatars/01.png",
      fallback: "OM",
      amount: "+$1,999.00",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
      fallback: "JL",
      amount: "+$39.00",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/avatars/03.png",
      fallback: "IN",
      amount: "+$299.00",
    },
    {
      name: "William Kim",
      email: "will@email.com",
      avatar: "/avatars/04.png",
      fallback: "WK",
      amount: "+$99.00",
    },
    {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "/avatars/05.png",
      fallback: "SD",
      amount: "+$39.00",
    },
  ];

  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div key={sale.email} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt="Avatar" />
            <AvatarFallback>{sale.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
