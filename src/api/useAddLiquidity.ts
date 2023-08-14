import { useMutation } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; // Assuming you've set up axiosInstance in your project

interface AddLiquidityPayload {
  amount1Desired: string;
  amount2Desired: string;
  amount1Min: string;
  amount2Min: string;
  deadlineDuration: number;
}

interface AddLiquidityResponse {
  success: boolean;
  message: string;
  output: {
    [key: string]: string; // This dynamic key type will allow for any token names like "INR" and "SGD".
  };
}

export const useAddLiquidity = (token0: string, token1: string) => {
  const addLiquidity = async (payload: AddLiquidityPayload): Promise<AddLiquidityResponse> => {
    const url = `/liquidity/add_liquidity/${token0}/${token1}`;
    const response = await axiosInstanceAdapter.post<AddLiquidityResponse>(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.message || 'Failed to add liquidity');
    }

    return response.data;
  };

  return useMutation(addLiquidity);
};
