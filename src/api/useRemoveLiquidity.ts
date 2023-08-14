import { useMutation } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; // Assuming you've set up axiosInstance in your project

interface RemoveLiquidityPayload {
  liquidityAmount: string;
  amount1Min: string;
  amount2Min: string;
}

interface RemoveLiquidityResponse {
  success: boolean;
  message: string;
  output: {
    amountAMinted: string;
    amountBMinted: string;
  };
}

export const useRemoveLiquidity = (token0: string, token1: string) => {
  const removeLiquidity = async (payload: RemoveLiquidityPayload): Promise<RemoveLiquidityResponse> => {
    const url = `/liquidity/remove_liquidity/${token0}/${token1}`;
    const response = await axiosInstanceAdapter.post<RemoveLiquidityResponse>(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.message || 'Failed to remove liquidity');
    }

    return response.data;
  };

  return useMutation(removeLiquidity);
};
