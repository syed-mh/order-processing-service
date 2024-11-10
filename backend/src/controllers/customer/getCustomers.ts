import { Request, RequestHandler, Response } from "express";
import Customer from "@/models/customer";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";

export const getCustomersDetails: RequestHandler = async (
  _: Request,
  res: Response
) => {
  try {
    const customers = await Customer.findAll();

    res
      .status(200)
      .json(customers.map((customer) => encryptPrimaryKeys(customer.toJSON())));

    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });

    return;
  }
};
