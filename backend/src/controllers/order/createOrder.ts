import { Request, RequestHandler, Response } from "express";
import Order from "@/models/order";
import OrderItem from "@/models/orderItem";
import Item from "@/models/item";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";
import { encrypt } from "@/utils/encrypt";
import { Customer } from "@/models";

export const createOrder: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerId, items } = req.body;

    if (!customerId) {
      res.status(402).json({ error: "No customer ID provided" });

      return;
    }

    if (!items?.length) {
      res.status(402).json({ error: "Please add products to your order." });

      return;
    }

    const customer = await Customer.findByPk(
      +decryptPrimaryKey(String(customerId))
    );

    // if (!customerId) {
    //   res.status(402).json({ error: "No customer ID provided" });

    //   return;
    // }

    const order = await Order.create({
      customerId: +decryptPrimaryKey(String(customerId)),
    });

    for (const item of items) {
      const product = await Item.findByPk(decryptPrimaryKey(item.itemId));

      if (!product) {
        res.status(402).json({
          error: `We can't find a product to go with this ID ${item.itemId}`,
          body: req.body,
        });
        return;
      }

      if (product.inventory < item.quantity) {
        res.status(400).json({
          error: `Please order ${item.quantity} or less of ${
            product?.name || item.itemId
          } due to limited inventory.`,
        });
        return;
      }

      await OrderItem.create({
        orderId: order.orderId,
        itemId: item.itemId,
        quantity: item.quantity,
      });

      await product.update({ inventory: product.inventory - item.quantity });
    }

    res.status(201).json({ orderId: encrypt(order.orderId) });

    return;
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: (error as Error).message });

    return;
  }
};
