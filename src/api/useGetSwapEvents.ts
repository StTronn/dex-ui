import { useQuery } from '@tanstack/react-query';
import { axiosInstanceAdapter } from './'; 

interface SwapEvent {
  sender: string;
  block: number;
  [key:string]:string;
}

interface SwapEventsResponse {
  success: boolean;
  data: SwapEvent[];
  // Include other fields if necessary
}

export const useGetSwapEvents = (coin1: string, coin2: string) => {
  
  const fetchSwapEvents = async (): Promise<SwapEventsResponse> => {
    const endpoint = `/liquidity/get_swap_events/${coin1}/${coin2}`;
    const response = await axiosInstanceAdapter.get<SwapEventsResponse>(endpoint, {
      headers: {
        accept: 'application/json',
        jwtToken: `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error('Failed to fetch swap events');
    }

    return response.data;
  };

  return useQuery(['swapEvents', coin1, coin2], fetchSwapEvents);
};

// Example of how to use useGetSwapEvents:
// const { data, isLoading, isError, error } = useGetSwapEvents('INR', 'SGD');

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
//         <p>Sender: {event.sender}</p>
//         <p>Amount 0 In: {event.amount0In}</p>
//         <p>Amount 0 Out: {event.amount0Out}</p>
//         <p>Amount 1 In: {event.amount1In}</p>
//         <p>Amount 1 Out: {event.amount1Out}</p>
//         <p>Block: {event.block}</p>
//       </div>
//     ))}
//   </div>
// );
