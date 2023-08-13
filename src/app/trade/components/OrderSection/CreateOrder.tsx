"use client"

import { useGetPoolInfo } from "@/api/usePoolgetInfo"
import { selectedPairAtom } from "@/atoms/selectedPairAtom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

export function CreateOrder() {
  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/'); // This will give INR and SGD for INR/SGD for example

  const { data: poolInfo, isLoading, isError, error } = useGetPoolInfo(token0, token1);

  const reserve0 = poolInfo?.reserve0 || 0;
  const reserve1 = poolInfo?.reserve1 || 0;

  const [amount0, setAmount0] = useState('');
  const [expectedAmount, setExpectedAmount] = useState('');

  useEffect(() => {
    if (amount0 && !isNaN(Number(amount0))) {
      const outputAmount = (Number(amount0) * Number(reserve1)) / (Number(amount0) + Number(reserve0));
      setExpectedAmount(outputAmount.toFixed(2));
    } else {
      setExpectedAmount('');  // Reset if invalid input
    }
  }, [amount0, reserve0, reserve1]);
  // style={{ background: 'linear-gradient(to bottom right, #280315, #041c34)' }}
  return (
    <Card className="col-span-1 p-6 shadow-md">
      <CardHeader className="mb-4">
        <CardTitle className="text-2xl font-bold">Swap</CardTitle>
        <CardDescription className="text-gray-600">{token0}/{token1}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="grid gap-2 mb-4 w-[160px]">
          <Label htmlFor="subject" className="text-gray-500">Balance</Label>
          <Input disabled id="subject" placeholder="Balance will appear here..." className="bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label className="text-gray-500">From Token: {token0}</Label>
            <Input
              id="inputAmount"
              placeholder={`Enter ${token0} amount...`}
              value={amount0}
              onChange={(e) => setAmount0(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>

          <div className='grid place-items-center -m-6'>
            <SwapIcon />
          </div>

          <div className="grid gap-2">
            <Label className="text-gray-500">To Token: {token1}</Label>
            <Input
              disabled
              id="expectedAmount"
              placeholder="Expected amount will appear here"
              value={expectedAmount}
              className="bg-gray-200 border p-2 rounded-md"
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-6">
        <Button style={{ background: "#bd9fe4" }} className="w-full p-2 rounded-md text-white font-bold">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}

const SwapIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-up"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
  )
}
