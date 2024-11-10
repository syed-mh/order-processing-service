import { Router } from "express";
import { getOrderDetails } from "@/controllers/order/getOrder";
import { createOrder } from "@/controllers/order/createOrder";
import { updateOrder } from "@/controllers/order/updateOrder";

const router = Router();

/**
 * Declare individual routes within the order
 * subsection of this backend
 */
router.get("/orders/:orderId", getOrderDetails);
router.post("/orders", createOrder);
router.put("/orders/:orderId", updateOrder);

export default router;
