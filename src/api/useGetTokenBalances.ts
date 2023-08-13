import { useQuery } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; // Assuming you've set up axiosInstance in your project

export const useGetTokenBalances = () => {
  const fetchTokenBalances = async (): Promise<TokenBalancesResponse> => {
    const url = `/liquidity/get_balances`;
    const response = await axiosInstanceAdapter.get<TokenBalancesResponse>(url, {
      headers: {
        accept: 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch token balances');
    }

    return response.data;
  };

  return useQuery(['tokenBalances'], fetchTokenBalances);
};

interface TokenBalancesResponse {
  INR: string;
  SGD: string;
  THB: string;
}
