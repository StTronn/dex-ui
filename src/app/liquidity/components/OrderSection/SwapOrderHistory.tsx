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
import { useAtom } from "jotai";
import { selectedPairAtom } from "@/atoms/selectedPairAtom";
import { useGetMintEvents } from "@/api/useGetMintEvents";

export const useSwapOrderHistory = (coin1: string, coin2: string) => {
  const { data, ...rest } = useGetMintEvents(coin1, coin2);

  const formattedData = data?.data.map((event) => ({
    sender: event.sender.slice(0, 9) + "...", // Assuming you'll have a timestamp in your data. Replace this with actual time.
    [coin1]: Number(event[coin1]),  // You can adjust depending on how you want to represent the volume
    [coin2]: Number(event[coin2]) / Number(event[coin1]),
  }));
  console.log({ formattedData })

  return { ...rest, data: formattedData };
};


export const RecentSalesCard = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>All Liquidity Minted</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <TradeHistoryTable />
      </CardContent>
    </Card>
  );
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

  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/');
  let { data, isLoading, isError, error } = useSwapOrderHistory(token0, token1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: {error?.message}</div>;
  }

  data = data?.length >= 10 ? data?.slice(0, 9) : data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sender</TableHead>
          <TableHead>{token0}</TableHead>
          <TableHead>{token1}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((trade, index) => (
          <TableRow key={index}>
            <TableCell className="w-[240px]">{trade.sender}</TableCell>
            <TableCell>{trade[token0].toLocaleString()}</TableCell>
            <TableCell>{trade[token1].toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
