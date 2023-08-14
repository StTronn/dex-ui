import { useQuery } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; 

interface MintEvent {
  minter: string;
  block: number;
  [key: string]: string | number;
}

interface MintEventsResponse {
  success: boolean;
  data: MintEvent[];
  // Include other fields if necessary
}

export const useGetMintEventsUser = (coin1: string, coin2: string) => {
  
  const fetchMintEvents = async (): Promise<MintEventsResponse> => {
    const endpoint = `/liquidity/get_mint_events_user/${coin1}/${coin2}`;
    const response = await axiosInstanceAdapter.get<MintEventsResponse>(endpoint, {
      headers: {
        accept: 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error('Failed to fetch mint events');
    }

    return response.data;
  };

  return useQuery(['mintEvents_USER', coin1, coin2], fetchMintEvents);
};

// Example of how to use useMintEvents:
// const { data, isLoading, isError, error } = useMintEvents('INR', 'SGD');

// if (isLoading) {
//   return <div>Loading...</div>;
// }

// if (isError) {
//   return <div>Error: {error?.message}</div>;
// }

// return (
//   <div>
//     {data?.data.map((event, idx) => (
//       <div key={idx}>
//         <p>Minter: {event.minter}</p>
//         <p>Amount 0: {event.amount0}</p>
//         <p>Amount 1: {event.amount1}</p>
//         <p>Block: {event.block}</p>
//       </div>
//     ))}
//   </div>
// );
