import { Request, RequestHandler, Response } from "express";
import Order from "@/models/order";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";

export const updateOrder: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["processing", "shipped", "delivered"].includes(status)) {
      res.status(402).json({ error: `Invalid status value "${status}"` });
    }

    const order = await Order.findByPk(decryptPrimaryKey(orderId));
    if (!order) {
      res.status(404).json({ error: "Order not found" });

      return;
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order: encryptPrimaryKeys(order.toJSON()),
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
