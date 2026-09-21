import api from "./api";

export const addFavorite = async (productId: number) => {
  const response = await api.post(`/favorites/${productId}`);
  return response.data;
};

export const removeFavorite = async (productId: number) => {
  const response = await api.delete(`/favorites/${productId}`);
  return response.data;
};

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};