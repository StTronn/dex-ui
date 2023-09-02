import { useGetTokenBalances } from "@/api/useGetTokenBalances"
import { useGetPoolInfo } from "@/api/usePoolgetInfo"
import { selectedPairAtom } from "@/atoms/selectedPairAtom"
import { ethers } from 'ethers';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import { useEffect, useState } from "react"

import { useRemoveLiquidity } from "@/api/useRemoveLiquidity"
import { useAddLiquidity } from "@/api/useAddLiquidity"
import { formatEtherValue } from "@/utils";

export function AddLiquidity() {
  const [showDialog, setShowDialog] = useState(false);
  const [swapResponse, setSwapResponse] = useState(null);
  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/');

  const [liquidityAmount, setLiquidityAmount] = useState('');
  const [amount1Desired, setAmount1Desired] = useState('');
  const [amount2Desired, setAmount2Desired] = useState('');

  const { data: poolInfo, isLoading, isError, error } = useGetPoolInfo(token0, token1);
  const { data: balances } = useGetTokenBalances();

  const addLiquidityMutation = useAddLiquidity(token0, token1);
  const removeLiquidityMutation = useRemoveLiquidity(token0, token1);

  console.log({ showDialog })
  useEffect(() => {
    if (amount1Desired) {
      const reserve0 = parseFloat(poolInfo?.[token0] || "0");
      const reserve1 = parseFloat(poolInfo?.[token1] || "0");

      if (reserve0 !== 0) {
        const newAmount2Desired = (parseFloat(amount1Desired) * reserve1) / (reserve0 + parseFloat(amount1Desired));
        setAmount2Desired(newAmount2Desired.toString());
      }
    }
  }, [amount1Desired, poolInfo, token0, token1]);

  const handleAddSubmit = async () => {
    try {
      const payload = {
        amount1Desired,
        amount2Desired,
        amount1Min: "0", // Modify as per your requirements
        amount2Min: "0", // Modify as per your requirements
        deadlineDuration: 1200, // Define this as per your requirements
      };
      const response = await addLiquidityMutation.mutateAsync(payload);
      setSwapResponse(response)
      setShowDialog(true);  // Show the dialog on successful swap
      console.log('Liquidity added successfully:', response);
      // Handle the response or show a success message to the user

    } catch (error) {
      console.error('Failed to add liquidity:', error);
      // Display an error message to the user
    }
  };

  // Define the submit handler
  const handleRemoveSubmit = async () => {
    try {
      const payload = {
        liquidityAmount,
        amount1Min: "0", // Modify as per your requirements
        amount2Min: "0", // Modify as per your requirements
      };
      const response = await removeLiquidityMutation.mutateAsync(payload);
      setSwapResponse(response)
      setShowDialog(true);  // Show the dialog on successful swap

      console.log('Liquidity removed successfully:', response);
      // Handle the response or show a success message to the user

    } catch (error) {
      console.error('Failed to remove liquidity:', error);
      // Display an error message to the user
    }
  };


  const strNumber = poolInfo?.totalLiquidity || "0"; // This is equivalent to "1709" multiplied by 10^18
  const divisor1 = BigInt("1000000000000000000"); // 10^18
  const divisor2 = BigInt(2);

  const userLiquidity = strNumber;

  return (
    <Card className="col-span-1 border-none">
      <AlertDialog>
        <CardHeader>
          <CardTitle className="text-2xl">
            <div className="grid grid-flow-col justify-between">
              <div> {token0}-{token1}  </div>
              <div>{formatEtherValue(poolInfo?.totalLiquidity || "0")}</div>
            </div>
          </CardTitle>
          <CardDescription className="justify-end">Liquidity</CardDescription>
        </CardHeader>
        <Tabs defaultValue="add">
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="add">Add</TabsTrigger>
            <TabsTrigger value="burn">Burn</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <CardContent className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="amount1">{token0}</Label>
                <Input
                  id="amount1"
                  placeholder={`Enter amount of ${token0}...`}
                  value={amount1Desired}
                  onChange={(e) => setAmount1Desired(e.target.value)}
                />
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="amount2">{token1}</Label>
                <Input
                  id="amount2"
                  placeholder={`Enter amount of ${token1}...`}
                  value={amount2Desired}
                  onChange={(e) => setAmount2Desired(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between mt-6 space-x-2">
              <AlertDialogTrigger className="w-full">
                <Button onClick={handleAddSubmit} className="w-full">Add</Button>
              </AlertDialogTrigger>
            </CardFooter>
          </TabsContent>
          <TabsContent value="burn">
            <CardContent className="grid gap-4 py-2">
              <div className="grid gap-2 ">
                <Label htmlFor="liquidity">Liquidity Balance</Label>
                <Input
                  disabled
                  id="liquidity"
                  placeholder="Liquidity will appear here..."
                  value={userLiquidity.toString()}
                />
              </div>
              <div className="grid gap-2">
                <Label>Amount to Remove</Label>
                <Input
                  id="liquidityAmount"
                  placeholder="Enter amount to remove..."
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between mt-6 space-x-2">
              <AlertDialogTrigger className="w-full">
                <Button onClick={handleRemoveSubmit} className="w-full">Remove</Button>
              </AlertDialogTrigger>
            </CardFooter>
          </TabsContent>
        </Tabs>

        <SwapSuccessDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          response={swapResponse}
          token0={token0}
          token1={token1}
        />
      </AlertDialog>
    </Card>
  );
}


export function SwapSuccessDialog({ isOpen, onClose, response, token0, token1 }) {
  console.log({ response })
  console.log(response?.output[token0])
  const truncatedHash = response?.output?.hash
    ? `${response.output.hash.slice(0, 6)}...${response.output.hash.slice(-4)}`
    : '';
  return (
    <>
      <AlertDialogContent onClose={onClose}>
        <AlertDialogHeader>
          <AlertDialogTitle>Txn Successful!</AlertDialogTitle>
          <AlertDialogDescription>
            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              {response && `Amount ${token0}: ${response.output[token0]}`}
            </div>
            <div style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>
              {response && `Amount ${token1}: ${response.output[token1]}`}
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

