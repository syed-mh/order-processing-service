import { Request, RequestHandler, Response } from "express";
import Order from "@/models/order";
import OrderItem from "@/models/orderItem";
import Item from "@/models/item";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";

export const getOrderDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res.status(402).json({ error: "Order ID not provided" });

      return;
    }

    const order = await Order.findByPk(decryptPrimaryKey(orderId), {
      include: [
        {
          model: OrderItem,
          include: [Item],
        },
      ],
    });

    if (!order) {
      res.status(404).json({ error: "Order not found" });

      return;
    }

    res.status(200).json(encryptPrimaryKeys(order.toJSON()));
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
