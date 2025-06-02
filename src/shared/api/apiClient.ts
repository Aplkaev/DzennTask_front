import axios from 'axios';
import { authStore } from '@/store/auth/auth';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = authStore.getState().token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // try {
      //   const { data } = await axios.post('/auth/refresh', {
      //     refreshToken: authStore.getState().refreshToken
      //   });
        
      //   authStore.getState().token = data.token
      //   originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        
      //   return apiClient(originalRequest);
      // } catch (refreshError) {
      //   authStore.getState().logout();
      //   return Promise.reject(refreshError);
      // }
    }
    
    return Promise.reject(error);
  }
);

export const api = {
  get: apiClient.get,
  post: apiClient.post,
  put: apiClient.put,
  delete: apiClient.delete,
  patch: apiClient.patch,
};