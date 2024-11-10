export type Order = {
  orderId: string;
  customerId: string;
  status: "processing" | "delivered" | "shipped";
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
};

export type OrderItem = {
  orderItemId: string;
  orderId: string;
  itemId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Item: Item;
};

export type Item = {
  itemId: string;
  name: string;
  inventory: number;
  price: string;
  createdAt: string;
  updatedAt: string;
};

export type Customer = {
  customerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};
