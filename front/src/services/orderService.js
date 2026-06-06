import axios from 'axios';

export async function createOrder(orderData) {
  const response = await axios.post(
    'http://localhost:4000/api/pedidos',
    orderData
  );

  return response.data;
}