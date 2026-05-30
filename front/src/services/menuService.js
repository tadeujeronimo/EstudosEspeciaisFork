import axios from 'axios';

export async function getMenuItems() {
  const response = await axios.get(
    'http://localhost:4000/api/cardapio'
  );

  return response.data;
}