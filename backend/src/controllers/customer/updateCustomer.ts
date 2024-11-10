import { Request, RequestHandler, Response } from "express";
import Customer from "@/models/customer";
import { decryptPrimaryKey } from "@/utils/decryptPrimaryKey";
import { encryptPrimaryKeys } from "@/utils/encryptPrimaryKeys";

export const updateCustomerDetails: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;
    const { name, email, phone, address } = req.body;

    if (!name && !email && !phone && !address) {
      res.status(402).json({ error: "No updateable details provided" });

      return;
    }

    const customer = await Customer.findByPk(decryptPrimaryKey(customerId));
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });

      return;
    }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    await customer.save();

    res.status(200).json({
      message: "Customer details updated successfully",
      customer: encryptPrimaryKeys(customer.toJSON()),
    });

    return;
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });

    return;
  }
};
