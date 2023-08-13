import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkerBar } from "@tremor/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export const RecentSalesCard = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Last Orders</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <TradeHistoryTable/>
      </CardContent>
    </Card>
  )

}
const trades = [
  {
    price: "$250.00",
    volume: "1.5 BTC",
    time: "12:45 PM",
  },
  {
    price: "$150.00",
    volume: "0.75 BTC",
    time: "12:46 PM",
  },
  {
    price: "$350.00",
    volume: "2 BTC",
    time: "1:15 PM",
  },
  {
    price: "$450.00",
    volume: "2.5 BTC",
    time: "1:30 PM",
  },
  {
    price: "$550.00",
    volume: "3 BTC",
    time: "2:00 PM",
  },
  {
    price: "$200.00",
    volume: "1 BTC",
    time: "2:15 PM",
  },
  {
    price: "$300.00",
    volume: "1.25 BTC",
    time: "2:45 PM",
  },
]

export function TradeHistoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Volume</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trades.map((trade, index) => (
          <TableRow key={index}>
            <TableCell>{trade.time}</TableCell>
            <TableCell>{trade.volume}</TableCell>
            <TableCell>{trade.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
