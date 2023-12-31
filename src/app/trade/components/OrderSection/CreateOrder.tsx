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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { useSwapOrder } from "@/api/useSwapToken"
import { Separator } from "@/components/ui/separator"
import { formatEtherValue, formatNumber } from "@/utils"
import { ethers } from "ethers"
import { Badge } from "@/components/ui/badge"
import { usePreviewRoute } from "@/api/usePreviewRoute"
import { useUpdateOrder } from "@/api/useUpdateOrder"

export function CreateOrder() {
  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/');

  const { data: poolInfo, isLoading, isError, error } = useGetPoolInfo(token0, token1);
  const { data: balances, isLoading: isBalanceLoading } = useGetTokenBalances();

  const [path, setPath] = useState(false); // 'buy' or 'sell'
  const [showPathViz, setShowPathViz] = useState(false); // 'buy' or 'sell'
  const [mode, setMode] = useState('buy'); // 'buy' or 'sell'
  const [inputToken, setInputToken] = useState(token0);
  const [outputToken, setOutputToken] = useState(token1);
  const [inputAmount, setInputAmount] = useState('');
  const [expectedAmount, setExpectedAmount] = useState('');

  const { mutate: getPreivewRoute } = usePreviewRoute();


  const [showDialog, setShowDialog] = useState(false);
  const [swapResponse, setSwapResponse] = useState(null);

  const createSwapMutation = useSwapOrder(inputToken, outputToken);
  const { mutate: updateOrder } = useUpdateOrder()

  useEffect(() => {
    if (mode === 'buy') {
      setInputToken(token1);
      setOutputToken(token0);
    } else {
      setInputToken(token0);
      setOutputToken(token1);
    }
  }, [mode]);

  useEffect(() => {
    if (inputAmount && !isNaN(Number(inputAmount))) {
      const reserveIn = mode === 'buy' ? poolInfo?.[token1] : poolInfo?.[token0];
      const reserveOut = mode === 'buy' ? poolInfo?.[token0] : poolInfo?.[token1];
      const calculatedAmount = (Number(inputAmount) * Number(reserveOut)) / (Number(reserveIn));
      setExpectedAmount(calculatedAmount.toFixed(2));
    } else {
      setExpectedAmount('');  // Reset if invalid input
    }
  }, [inputAmount, mode, poolInfo, token0, token1]);

  // Define the submit handler
  const handleSwapSubmit = async () => {
    try {
      const payload = {
        amountIn: inputAmount,
        amountOutMin: "0.0001", // Modify this if there's a different logic for minimum accepted amount
      };
      const response = await createSwapMutation.mutateAsync(payload);
      response.output.amountIn

      updateOrder({
        from: inputToken,
        to: outputToken,
        from_val: inputAmount,
        to_val: response.output.amountOut
      })
      // Handle response here if needed
      setSwapResponse(response);
      setShowDialog(true);  // Show the dialog on successful swap
      // Maybe show a success message to the user or perform further actions

    } catch (error) {
      console.error('Failed to swap:', error);
      // Display an error message to the user
    }
  };


  const handlePathVizShow = () => {
    getPreivewRoute({ swapPool: inputToken + "/" + outputToken, swapAmount: Number(inputAmount) }, {
      onSuccess: (data) => {
        console.log('sor', data)
        console.log("tranformData", transformData(data.data))
      }
    })
    setShowPathViz(true);
  }



  let price = 0;
  if (poolInfo?.[inputToken] && poolInfo?.[outputToken]) {
    const calculatedPrice = Number(poolInfo[token1]) / Number(poolInfo[token0]);
    price = isNaN(calculatedPrice) ? 0 : formatNumber(calculatedPrice);

  }

  return (
    <Card className="col-span-1 border-none">
      <AlertDialog>
        <CardHeader>
          <CardTitle className="text-2xl">
            <div className="grid grid-flow-col justify-between">
              <div> {token0}/{token1}  </div>
              <div>{price !== null ? `${price.toString()} ${token1}` : 'Loading...'}</div>
            </div>
          </CardTitle>
          <CardDescription className="justify-end">Price</CardDescription>
        </CardHeader>
        <Tabs defaultValue="buy">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="buy" onClick={() => setMode('buy')}>Buy</TabsTrigger>
            <TabsTrigger value="sell" onClick={() => setMode('sell')}>Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            {/* You can move the below shared JSX to a new component or use a conditional render based on mode */}
            <CardContent className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>{inputToken}</Label>
                <Input
                  id="inputAmount"
                  placeholder={`Enter amount`}
                  value={inputAmount}
                  onChange={(e) => setInputAmount(e.target.value)}
                />
                <div className="text-xs text-muted-foreground mb-2"> Balance: {formatNumber(balances?.[inputToken] || "0")}</div>
              </div>
              <div className="grid gap-2">
                <Label>Expected {outputToken}</Label>
                <Input
                  disabled
                  id="expectedAmount"
                  placeholder="Expected amount"
                  value={expectedAmount}
                />
              </div>
            </CardContent>
            <CardFooter className="grid grid-flow-row gap-4 mt-6">
              <AlertDialogTrigger className="">
                <Button onClick={handleSwapSubmit} className="w-full">Buy</Button>
              </AlertDialogTrigger>
              <Button variant="secondary" onClick={handlePathVizShow} className="">Preview</Button>
            </CardFooter>
            {showPathViz && <PathViz amountIn={inputAmount} amountOut={expectedAmount} />}
          </TabsContent>
          {/* Add similar TabsContent for the "sell" mode if needed, or use conditional rendering based on mode */}
          <TabsContent value="sell">
            <CardContent className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>{token0}</Label>
                <Input
                  id="sellInputAmount"
                  placeholder={`Enter amount`}
                  value={inputAmount} // Reuse the state or create a separate state for the sell amount
                  onChange={(e) => setInputAmount(e.target.value)}
                />
                <div className="text-xs text-muted-foreground mb-2"> Balance: {formatNumber(balances?.[inputToken] || "0")}</div>
              </div>
              <div className="grid gap-2">
                <Label>Expected {token1}</Label>
                <Input
                  disabled
                  id="sellExpectedAmount"
                  placeholder="Expected amount"
                  value={expectedAmount}
                />
              </div>
            </CardContent>
            <CardFooter className="grid grid-flow-row gap-4 mt-6">
              <AlertDialogTrigger className="">
                <Button onClick={handleSwapSubmit} className="w-full">Sell</Button>
              </AlertDialogTrigger>
              <Button variant="secondary" onClick={handlePathVizShow} className="">Preview</Button>
            </CardFooter>
            {showPathViz && <PathViz amountIn={inputAmount} amountOut={expectedAmount} />}
          </TabsContent>
        </Tabs>
        <SwapSuccessDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          response={swapResponse}
        />
      </AlertDialog>
    </Card>);
}

const SwapIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-up"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
  )
}


export function SwapSuccessDialog({ isOpen, onClose, response }) {
  const truncatedHash = response?.output?.hash
    ? `${response.output.hash.slice(0, 6)}...${response.output.hash.slice(-4)}`
    : '';
  return (
    <>
      <AlertDialogContent onClose={onClose}>
        <AlertDialogHeader>
          <AlertDialogTitle>Swap Successful!</AlertDialogTitle>
          <AlertDialogDescription>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {response && `Amount IN: ${response.output.amountIn}`}
            </div>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {response && `Amount OUT: ${response.output.amountOut}`}
            </div>
            <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>
              {response && `Transaction ID: ${truncatedHash}`}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}



export function PathViz({ amountIn, amountOut }) {
  return (
    <div className="grid gap-2">
      <div className="px-6 py-2">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Best Route</h4>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-2">
          <div className="flex w-full h-5 items-center space-x-2  justify-between text-sm">
            <div className=""> <Badge variant="default">{amountIn}</Badge></div>
            <Separator orientation="vertical" />
            <Badge className="" variant="outline">INR/THB/SGD</Badge>
            <Separator orientation="vertical" />
            <Badge className="" variant="destructive">{amountOut}</Badge>
          </div>
        </div>
      </div>
      <div className="px-6 py-2">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Direct Route</h4>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-2">
          <div className="flex w-full h-5 items-center space-x-2  justify-between text-sm">
            <div className=""> <Badge variant="default">{amountIn}</Badge></div>
            <Separator orientation="vertical" />
            <Badge className="" variant="outline">INR/SGD</Badge>
            <Separator orientation="vertical" />
            <Badge className="" variant="destructive">{(Number(amountOut) * 0.999).toFixed(2)}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

