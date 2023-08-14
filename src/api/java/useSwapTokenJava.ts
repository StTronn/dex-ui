import { useMutation } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; // Assuming you've set up axiosInstance in your project

interface SwapPayload {
  amountIn: string;
  amountOutMin: string;
}

interface SwapResponse {
  success: boolean;
  message: string;
  output: {
    amountIn: string;
    amountOut: string;
  };
}

export const useSwapOrderJava = (token0: string, token1: string) => {
  const createSwap = async (payload: SwapPayload): Promise<SwapResponse> => {
    const url = `/liquidity/swap/${token0}/${token1}`;
    const response = await axiosInstanceAdapter.post<SwapResponse>(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.message || 'Failed to create swap');
    }

    return response.data;
  };

  return useMutation(createSwap);
};

// Example of how to use useCreateSwapHook:
// const { mutate } = useCreateSwapHook('INR', 'SGD');
// mutate({ amountIn: '1', amountOutMin: '0.001' });
