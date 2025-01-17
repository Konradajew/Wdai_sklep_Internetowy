import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
