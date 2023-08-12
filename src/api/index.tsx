import { URL } from '@/constants';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: URL,
});
