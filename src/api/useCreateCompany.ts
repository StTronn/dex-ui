import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './index'; // adjust the path

interface CompanyData {
  name: string;
  contact: string;
  emailId: string;
  password: string;
}

export const useCreateCompany = () => {
  const createCompany = async (data: CompanyData) => {
    const response = await axiosInstance.post('/project51/v1/onboarding/create/company', data);
    
    if (response.status !== 200) {
      throw new Error('Failed to create company');
    }

    return response.data;
  };

  return useMutation(createCompany);
};


