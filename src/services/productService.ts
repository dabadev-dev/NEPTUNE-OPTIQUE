import axios from "axios";
import type { Product } from "../data/products";


export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`http://localhost:3000/products`);
  return response.data;
};