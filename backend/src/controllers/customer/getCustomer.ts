import { Request, RequestHandler, Response } from "express";
import Customer from "@/models/customer";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";

export const getCustomerDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findByPk(decryptPrimaryKey(customerId));
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });

      return;
    }

    res.status(200).json(encryptPrimaryKeys(customer.toJSON()));

    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });

    return;
  }
};
