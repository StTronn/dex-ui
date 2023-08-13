import { ADAPTER_URL, URL } from '@/constants';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: URL,
});

export const axiosInstanceAdapter = axios.create({
  baseURL: 'http://localhost:5023',
});
