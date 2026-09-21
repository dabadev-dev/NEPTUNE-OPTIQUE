import api from "./api";

export interface CreateOrderData {
  nom: string;
  telephone: string;
  adresse: string;
  ville: string;
  paiement: string;
}

export const createOrder = async (
  data: CreateOrderData,
) => {
  const response = await api.post("/orders", data);

  window.dispatchEvent(new Event("cartUpdated"));

  return response.data;
};

export const getMyOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getAllOrders = async () => {
  const response = await api.get("/orders/admin");

  return response.data;
};

export const updateOrderStatus = async (
  orderId: number,
  status: string,
) => {
  const response = await api.patch(
    `/orders/${orderId}/status`,
    { status },
  );

  return response.data;
}
