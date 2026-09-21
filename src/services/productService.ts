// import axios from "axios";
// import type { Product } from "../data/products";


// export const getProducts = async (): Promise<Product[]> => {
//   const response = await axios.get<Product[]>(`https://backend-neptune.onrender.com/products`);
//   return response.data;
// };


// export const getProducts = async (): Promise<Product[]> => {
//   const response = await axios.get<Product[]>(`http://localhost:3000/products`);
//   return response.data;
// };


import api from "./api";
import type { Product } from "../data/products";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");

  return response.data.map((product: any) => ({
    ...product,
    price: Number(product.price),
  }));
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return {
    ...response.data,
    price: Number(response.data.price),
  };
};

export const createProduct = async (productData: Omit<Product, "id">) => {
  const response = await api.post("/products", productData);

  return {
    ...response.data,
    price: Number(response.data.price),
  };
};

export const updateProduct = async (
  id: number,
  productData: Partial<Omit<Product, "id">>
) => {
  const response = await api.put(`/products/${id}`, productData);

  return {
    ...response.data,
    price: Number(response.data.price),
  };
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};