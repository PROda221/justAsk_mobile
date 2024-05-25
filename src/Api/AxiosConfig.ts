/* eslint-disable @typescript-eslint/naming-convention */
import axios, {type AxiosResponse} from 'axios';
import { baseURL } from '../Constants';
import { retrieveAccessToken } from '../Functions/EncryptedStorage';

// Set your base URL here

// Create axios instance
const axiosInstance = axios.create({
  baseURL,
  timeout: 15000, // Adjust as needed
});

// Add a request interceptor to include the auth token in each request
axiosInstance.interceptors.request.use(
  async config => {
    // Add your authentication logic here, for example:
    const authToken = await retrieveAccessToken();
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  async error => Promise.reject(error),
);

// Custom functions for GET, POST, PUT requests

const get = async <T>(url: string, params = {}): Promise<AxiosResponse<T>> =>
  axiosInstance.get<T>(url, {params});

const post = async <T>(
  url: string,
  data = {},
  config = {},
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axiosInstance.post<T>(url, data, config);
    return response;
  } catch (error) {
    // Handle errors
    if (error.response) {
      throw error.response.data;
    }

    throw error;
  }
};

const put = async <T>(
  url: string,
  data = {},
  config = {},
): Promise<AxiosResponse<T>> => axiosInstance.put(url, data, config);

export {get, post, put};
