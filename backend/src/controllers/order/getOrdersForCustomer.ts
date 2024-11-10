import { Request, RequestHandler, Response } from "express";
import Order from "@/models/order";
import OrderItem from "@/models/orderItem";
import Item from "@/models/item";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";

export const getAllOrdersForCustomer: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;

    const orders = await Order.findAll({
      where: { customerId: decryptPrimaryKey(customerId) },
      include: [
        {
          model: OrderItem,
          include: [Item],
        },
      ],
    });

    if (orders.length === 0) {
      res.status(404).json({ error: "No orders found for this customer" });

      return;
    }

    res
      .status(200)
      .json(encryptPrimaryKeys(orders.map((order) => order.toJSON())));

    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });

    return;
  }
};
