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
import { useGetSwapEvents } from "@/api/useGetSwapEvents";
import { useAtom } from "jotai";
import { selectedPairAtom } from "@/atoms/selectedPairAtom";
import { formatNumber } from "@/utils";

export const useSwapOrderHistory = (coin1: string, coin2: string) => {
  const { data, ...rest } = useGetSwapEvents(coin1, coin2);

  const formattedData = data?.data.map((event) => ({
    time: event.time, // Assuming you'll have a timestamp in your data. Replace this with actual time.
    [coin1]: Number(event[coin1]),  // You can adjust depending on how you want to represent the volume
    [coin2]: Number(event[coin2]) / Number(event[coin1]),
  }));

  return { ...rest, data: formattedData };
};


export const RecentSalesCard = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Market Trades</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <TradeHistoryTable />
      </CardContent>
    </Card>
  );
}


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
  data = data?.reverse()

  data = data?.length >= 10 ? data?.slice(0, 9) : data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((trade, index) => (
          <TableRow key={index}>
            <TableCell className="w-[240px]">{new Date(trade.time).toLocaleTimeString()}</TableCell>
            <TableCell>{formatNumber(trade[token0])}</TableCell>
            <TableCell>{trade ? formatNumber(Number(trade?.[token1])) : '1'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
