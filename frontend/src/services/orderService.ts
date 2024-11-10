import { Order } from "@/types";
import api from "../utils/axios";

export const fetchOrders = async (customerId: string): Promise<Order[]> => {
  const response = await api.get(`/customers/${customerId}/orders`);
  return response.data;
};

export const fetchOrderDetails = async (orderId: string) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await api.put(`/orders/${orderId}`, { status });
  return response.data;
};
