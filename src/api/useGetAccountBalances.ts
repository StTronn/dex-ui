import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './'; // Using './' as per your instruction
import { useAtom } from 'jotai';
import { authTokenAtom } from '@/atoms/authTokenAtom';

export const useGetAccountBalances = () => {

  const fetchAccountBalances = async (): Promise<AccountBalancesResponse> => {
    const response = await axiosInstance.get<AccountBalancesResponse>('/project51/v1/balance/token/balance', {
      headers: {
        accept: 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200) {
      throw new Error(response.data.errorReason || 'Failed to fetch account balances');
    }

    return response.data;
  };

  return useQuery(['accountBalances'], fetchAccountBalances);
};

interface AccountBalancesResponse {
  statusCode: number;
  data: {
    inrBalance: string;
    sgdBalance: string;
    thbBalance: string;
  };
  errorReason: string;
  message: string;
}

// Example of how to use useGetAccountBalances:
// const { data, isLoading, isError, error } = useGetAccountBalances();

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (isError) {
//   return <div>Error: {error?.message}</div>;
// }

// return (
//   <div>
//     <p>INR Balance: {data?.data.inrBalance}</p>
//     <p>SGD Balance: {data?.data.sgdBalance}</p>
//     <p>THB Balance: {data?.data.thbBalance}</p>
//   </div>
// );
