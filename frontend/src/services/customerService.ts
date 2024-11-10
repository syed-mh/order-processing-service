import { Customer } from "@/types";
import api from "../utils/axios";

export const fetchCustomersDetails = async (): Promise<Customer[]> => {
  const response = await api.get(`/customers`);
  return response.data;
};

export const fetchCustomerDetails = async (customerId: string) => {
  const response = await api.get(`/customers/${customerId}`);
  return response.data;
};

export const updateCustomerDetails = async (
  customerId: string,
  data: { name: string; email: string; phone: string; address: string }
) => {
  const response = await api.put(`/customers/${customerId}`, data);
  return response.data;
};
