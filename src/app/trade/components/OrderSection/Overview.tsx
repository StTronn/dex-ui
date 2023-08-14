import React from 'react';
import { useGetPoolInfo } from '@/api/usePoolgetInfo'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export const Overview = () => {
  const coin0 = "THB";
  const coin1 = "SGD";
  const { data, isLoading, isError, error } = useGetPoolInfo(coin0, coin1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 col-span-2">
      {/* Card for token0 info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{coin0} Reserve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data[coin0]}</div>
          <p className="text-xs text-muted-foreground">Liquidity Value: {data.liquidityValueInToken0.join(', ')}</p>
        </CardContent>
      </Card>

      {/* Card for token1 info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{coin1} Reserve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data[coin1]}</div>
          <p className="text-xs text-muted-foreground">Liquidity Value: {data.liquidityValueInToken1.join(', ')}</p>
        </CardContent>
      </Card>

      {/* Card for total liquidity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Liquidity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalLiquidity}</div>
        </CardContent>
      </Card>
    </div>
  );
}
