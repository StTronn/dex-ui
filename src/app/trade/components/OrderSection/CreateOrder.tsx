"use client"

import { useGetTokenBalances } from "@/api/useGetTokenBalances"
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
import { useAtom } from "jotai"
import { useEffect, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSwapHook } from "@/api/useSwapToken"

export function CreateOrder() {
  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/'); // This will give INR and SGD for INR/SGD for example

  const { data: poolInfo, isLoading, isError, error } = useGetPoolInfo(token0, token1);
  const { data: balances } = useGetTokenBalances();

  const reserve0 = poolInfo?.[token0] || 0;
  const reserve1 = poolInfo?.[token1] || 0;
  console.log({ reserve0, reserve1 })
  console.log(poolInfo?.[token0])

  const [amount0, setAmount0] = useState('');
  const [expectedAmount, setExpectedAmount] = useState('');

  useEffect(() => {
    if (amount0 && !isNaN(Number(amount0))) {
      const outputAmount = (Number(amount0) * Number(reserve1)) / (Number(reserve0));
      setExpectedAmount(outputAmount.toFixed(2));
    } else {
      setExpectedAmount('');  // Reset if invalid input
    }
  }, [amount0, reserve0, reserve1]);
  // style={{ background: 'linear-gradient(to bottom right, #280315, #041c34)' }}

  // Instantiate the mutation
  const createSwapMutation = useSwapHook(token0, token1);

  // Define the submit handler
  const handleSwapSubmit = async () => {
    try {
      const payload = {
        amountIn: amount0,
        amountOutMin: "0.0001", // Modify this if there's a different logic for minimum accepted amount
      };
      const response = await createSwapMutation.mutateAsync(payload);

      // Handle response here if needed
      console.log('Swap successful:', response);
      // Maybe show a success message to the user or perform further actions

    } catch (error) {
      console.error('Failed to swap:', error);
      // Display an error message to the user
    }
  };
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-2xl">Swap</CardTitle>
        <CardDescription>{token0}-{token1}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2 mb-4 w-[160px]">
          <Label htmlFor="subject">Balance</Label>
          <Input disabled id="subject" placeholder="Balance will appear here..." value={balances ? balances?.[token0] : null} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Token</Label>
            <span>{token0}</span>
          </div>
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input
              id="inputAmount"
              placeholder="Enter amount..."
              value={amount0}
              onChange={(e) => setAmount0(e.target.value)}
            />
          </div>
        </div>
        <div className='grid place-items-center -m-6'>
          <SwapIcon />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Token</Label>
            <span>{token1}</span>
            <div className="grid gap-2">
              <Label>Expected Amount</Label>
              <Input
                disabled
                id="expectedAmount"
                placeholder="Expected amount will appear here"
                value={expectedAmount}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between mt-6 space-x-2">
        <Button onClick={handleSwapSubmit} className="w-full">Trade</Button>
      </CardFooter>
    </Card>);
}

const SwapIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-up"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
  )
}



export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
