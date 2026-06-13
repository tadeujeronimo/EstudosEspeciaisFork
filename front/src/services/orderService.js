import axios from 'axios';
import { API_BASE } from './api';

export async function createOrder(orderData) {
  const response = await axios.post(
    `${API_BASE}/api/pedidos`,
    orderData
  );

  return response.data;
}