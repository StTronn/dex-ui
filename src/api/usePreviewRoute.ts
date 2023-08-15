
// usePreviewRoute.ts

import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './index'; // adjust the path as necessary

interface PreviewRouteData {
  swapPool: string;
  swapAmount: number;
}

export const usePreviewRoute = () => {
  const previewRoute = async (data: PreviewRouteData) => {
    const response = await axiosInstance.post(
      `/project51/v1/trade/compute-smart-order-route?swapPool=${data.swapPool}&swapAmount=${data.swapAmount}`
    );
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch preview route');
    }

    return response.data;
  };

  return useMutation(previewRoute);
};
