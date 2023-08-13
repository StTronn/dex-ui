import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './'; // Assuming you've set up axiosInstance in your project

export const useGetPoolInfo = (coin0: string, coin1: string) => {

  const fetchPoolInfo = async (): Promise<PoolInfoResponse> => {
    const url = `/liquidity/get_pool_info/${coin0}/${coin1}`;
    const response = await axiosInstance.get<PoolInfoResponse>(url, {
      headers: {
        accept: 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch pool info');
    }

    return response.data;
  };

  return useQuery(['poolInfo', coin0, coin1], fetchPoolInfo);
};

interface PoolInfoResponse {
  reserve0: string;
  reserve1: string;
  totalLiquidity: string;
  token0Price: string;
  token1Price: string;
  liquidityValueInToken0: [number, number, number];
  liquidityValueInToken1: [];
}

// Example of how to use useGetPoolInfo:

// const coin0 = "INR";
// const coin1 = "SGD";
// const { data, isLoading, isError, error } = useGetPoolInfo(coin0, coin1);

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (isError) {
//   return <div>Error: {error?.message}</div>;
// }

// return (
//   <div>
//     <p>Reserve for {coin0}: {data?.reserve0}</p>
//     <p>Reserve for {coin1}: {data?.reserve1}</p>
//     //... Render other data fields as needed
//   </div>
// );
