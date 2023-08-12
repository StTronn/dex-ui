import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './'; // Adjust the path if needed

interface QueryParams {
  from_currency: string;
  to_currency: string;
  from_date: string;
  to_date: string;
}

interface GraphData {
  date: string;
  value: string;
  fromCurrency: string;
  toCurrency: string;
}

interface GraphDataResponse {
  statusCode: number;
  data: GraphData[];
  errorReason?: string;
  message: string;
}

export const useGetGraphData = (queryParams: QueryParams) => {
  const fetchGraphData = async (): Promise<GraphDataResponse> => {
    const response = await axiosInstance.get<GraphDataResponse>('/project51/v1/data/getGraphData', { params: queryParams });
    
    if (response.status !== 200) {
      throw new Error(response.data.errorReason || 'Failed to fetch graph data');
    }

    return response.data;
  };

  return useQuery(['graphData', queryParams], fetchGraphData, {
    // You can add more React Query options like staleTime, cacheTime, etc.
  });
};
