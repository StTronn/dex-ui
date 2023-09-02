import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './'; // Using './' as per your instruction
import { useAtom } from 'jotai';
import { authTokenAtom } from '@/atoms/authTokenAtom';

export const useLogin = () => {
  const [_, setAuthToken] = useAtom(authTokenAtom);
  const login = async (data: LoginData): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/project51/v1/onboarding/login', data);

    if (response.status !== 200) {
      throw new Error(response.data.errorReason || 'Failed to login');
    }

    return response.data;
  };

  return useMutation(login, {
    onSuccess: (data) => {
      setAuthToken(data.data.authToken)
      localStorage.setItem('authToken', data.data.authToken);
    }
  });
};

interface LoginData {
  emailId: string;
  password: string;
}

interface LoginResponse {
  statusCode: number;
  data: {
    authToken: string;
  };
  errorReason: string;
  message: string;
}



// import { useLogin } from './'; // Adjust the path if needed

// const LoginComponent = () => {
//   const { mutate, isLoading, isError, error, data } = useLogin();

//   const handleLogin = (loginData: LoginData) => {
//     mutate(loginData);
//   };

//   // Here you can handle rendering based on the status of the login request
//   // For example, show an error message if login failed (isError is true)
//   // Or store the authToken somewhere if login was successful

//   return (
//     // JSX for the login form and feedback about the login process...
//   );
// };
