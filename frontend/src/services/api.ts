import axios from 'axios';
import { useAuth } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuth.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email: string, password: string, firstName: string, lastName: string) =>
    apiClient.post('/auth/register', { email, password, firstName, lastName }),

  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (data: any) => apiClient.put('/auth/profile', data),
};

export const productService = {
  getProducts: (params?: any) => apiClient.get('/products', { params }),

  getProduct: (id: string) => apiClient.get(`/products/${id}`),

  syncShopify: () => apiClient.post('/products/sync/shopify'),
};

export const orderService = {
  createOrder: (orderData: any) => apiClient.post('/orders', orderData),

  getOrder: (id: string) => apiClient.get(`/orders/${id}`),

  getUserOrders: (params?: any) => apiClient.get('/orders', { params }),

  getAllOrders: (params?: any) => apiClient.get('/orders/all', { params }),

  updateOrderStatus: (id: string, data: any) => apiClient.put(`/orders/${id}`, data),
};

export default apiClient;
