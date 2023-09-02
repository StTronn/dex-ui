import React from 'react';
import { useGetPoolInfo } from '@/api/usePoolgetInfo'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAtom } from 'jotai';
import { selectedPairAtom } from '@/atoms/selectedPairAtom';
import { ethers } from 'ethers';
import { formatNumber } from '@/utils';


export const Overview = () => {
  const [selectedPair] = useAtom(selectedPairAtom);
  const [token0, token1] = selectedPair.split('/');
  const { data, isLoading, isError, error } = useGetPoolInfo(token0, token1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error: {error?.message}</div>;
  }

  const formatValue = (value) => {
    const formattedEther = ethers.formatEther(value);
    return new Intl.NumberFormat('en-US').format(parseFloat(formattedEther));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 col-span-2">
      {/* Card for token0 info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{token0} Reserve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(formatValue(data[token0]))}</div>
        </CardContent>
      </Card>

      {/* Card for token1 info */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{token1} Reserve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(formatValue(data[token1]))}</div>
        </CardContent>
      </Card>

      {/* Card for total liquidity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Liquidity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(formatValue(data.totalLiquidity))}</div>
        </CardContent>
      </Card>
    </div>
  );
}
