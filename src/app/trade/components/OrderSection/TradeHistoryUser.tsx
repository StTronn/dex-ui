import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAtom } from "jotai";
import { selectedPairAtom } from "@/atoms/selectedPairAtom";
import { useGetSwapEventsUser } from "@/api/useGetSwapEventsUser";
import { formatNumber } from "@/utils";

export const useSwapOrderHistory = (coin1: string, coin2: string) => {
  const { data, ...rest } = useGetSwapEventsUser(coin1, coin2);

  const formattedData = data?.data.map((event) => ({
    time: event.time, // Assuming you'll have a timestamp in your data. Replace this with actual time.
    [coin1]: Number(event[coin1]),  // You can adjust depending on how you want to represent the volume
    [coin2]: Number(event[coin2]) / Number(event[coin1]),
  }));

  return { ...rest, data: formattedData };
};


export const TradeHistoryUserCard = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>User Trades</CardTitle>
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

  data = data?.reverse()

  if (data?.length === 0) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-md text-sm">
        No Trades yet...
      </div>

    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>{token0}</TableHead>
          <TableHead>{token1}</TableHead>
        </TableRow>
      </TableHeader>
      {
        data?.length !== 0 &&

        <TableBody>
          {data?.map((trade, index) => (
            <TableRow key={index}>
              <TableCell className="w-[240px]">{new Date(trade.time).toLocaleTimeString()}</TableCell>
              <TableCell>{formatNumber(trade[token0])}</TableCell>
              <TableCell>{formatNumber(trade[token1].toLocaleString())}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      }
    </Table>
  );
}
