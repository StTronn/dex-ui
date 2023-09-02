import { useQuery } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './';

interface Liquidity {
  liquidityTokens: string;
  liquidityInToken0: string;
  liquidityInToken1: string;
}

interface LiquidityResponse {
  success: boolean;
  data: Liquidity;
}

const fetchUserLiquidity = async (coin1: string, coin2: string): Promise<LiquidityResponse> => {
  const endpoint = `/liquidity/get_user_liquidity/${coin1}/${coin2}`;
  const response = await axiosInstanceAdapter.get<LiquidityResponse>(endpoint, {
    headers: {
      accept: 'application/json',
      jwtToken: `${localStorage.getItem('authToken')}`,
    },
  });


  return response;
};

export const useGetUserLiquidity = (coin1: string, coin2: string) => {
  return useQuery(['userLiquidity', coin1, coin2], () => fetchUserLiquidity(coin1, coin2));
};

// Example of how to use useGetUserLiquidity:
// const { data, isLoading, isError, error } = useGetUserLiquidity('INR', 'SGD');

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (isError) {
//   return <div>Error: {error?.message}</div>;
// }

// return (
//   <div>
//     <p>Liquidity Tokens: {data?.data.liquidityTokens}</p>
//     <p>Liquidity In Token0: {data?.data.liquidityInToken0}</p>
//     <p>Liquidity In Token1: {data?.data.liquidityInToken1}</p>
//   </div>
// );
