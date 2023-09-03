import { useMutation } from '@tanstack/react-query';
import { axiosInstance  } from './'; // Assuming you've set up axiosInstance in your project

interface UpdateOrderPayload {
  from: string;
  to: string;
  from_val: string;
  to_val: string;
}

interface UpdateOrderResponse {
  success: boolean;
  message: string;
  // You can add additional response fields here, as needed.
}

export const useUpdateOrder = () => {
  const updateOrder = async (payload: UpdateOrderPayload): Promise<UpdateOrderResponse> => {
    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date to 'yyyy-MM-dd HH:mm:ss'
    const url = `/project51/v1/data/update?from=${payload.from}&to=${payload.to}&from_val=${payload.from_val}&to_val=${payload.to_val}&date=${encodeURIComponent(currentTime)}`;

    const response = await axiosInstance.put<UpdateOrderResponse>(url, null, {
      headers: {
        'accept': 'application/json',
        'jwtToken': `${localStorage.getItem('authToken')}`
      }
    });

    if (response.status !== 200 || !response.data.success) {
      throw new Error(response.data.message || 'Failed to update order');
    }

    return response.data;
  };

  return useMutation(updateOrder);
};

// Example of how to use the useUpdateOrder hook:
// const { mutate } = useUpdateOrder();
// mutate({
//   from: 'SGD',
//   to: 'THB',
//   from_val: '1000',
//   to_val: '26128',
// });





