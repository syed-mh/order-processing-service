import { Router } from "express";
import { getCustomerDetails } from "@/controllers/customer/getCustomer";
import { updateCustomerDetails } from "@/controllers/customer/updateCustomer";
import { getAllOrdersForCustomer } from "@/controllers/order/getOrdersForCustomer";
import { getCustomersDetails } from "@/controllers/customer/getCustomers";

const router = Router();

/**
 * Declare individual routes within the customer
 * subsection of this backend
 */
router.get("/customers", getCustomersDetails);
router.get("/customers/:customerId", getCustomerDetails);
router.put("/customers/:customerId", updateCustomerDetails);
router.get("/customers/:customerId/orders", getAllOrdersForCustomer);

export default router;
