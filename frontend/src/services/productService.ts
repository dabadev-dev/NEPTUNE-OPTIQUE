import axios from "axios";
import type { Product } from "../data/products";

const API_URL = "http://localhost:3000";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/products`);
  return response.data;
};