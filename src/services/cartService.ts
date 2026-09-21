import api from "./api";

const notifyCartChange = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = async (
  productId: number,
  quantity: number = 1,
) => {
  const response = await api.post(`/cart/${productId}`, {
    quantity,
  });

  notifyCartChange();

  return response.data;
};

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

export const updateCartQuantity = async (
  productId: number,
  quantity: number,
) => {
  const response = await api.patch(`/cart/${productId}`, {
    quantity,
  });

  notifyCartChange();

  return response.data;
};

export const removeFromCart = async (
  productId: number,
) => {
  const response = await api.delete(`/cart/${productId}`);

  notifyCartChange();

  return response.data;
};