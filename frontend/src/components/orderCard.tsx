"use client";
import { updateOrderStatus } from "@/services/orderService";
import { Order, OrderItem } from "@/types";
import { showInfoToast, showSuccessToast } from "@/utils/toast";
import { useCallback, useState } from "react";

type props = {
  order: Order;
};

export const OrderCard = ({ order }: props) => {
  const [orderStatus, setOrderStatus] = useState(order.status);

  const computeOrderTotal = useCallback(
    (orderItems: OrderItem[]): number =>
      Math.round(
        orderItems.reduce(
          (accumulator, current) =>
            (accumulator += +current.Item.price * +current.quantity),
          0
        )
      ),
    []
  );

  const computeItemTotal = useCallback(
    (price: number, quantity: number) => price * quantity,
    []
  );

  const statusFontColor = useCallback(
    (status: "processing" | "shipped" | "delivered"): string => {
      if (status === "shipped") return "text-sky-600";
      if (status === "processing") return "text-amber-600";
      return "text-green-600";
    },
    []
  );

  const nextOrderStatus = useCallback(():
    | "processing"
    | "shipped"
    | "delivered"
    | "" => {
    if (orderStatus === "processing") return "shipped";
    if (orderStatus === "shipped") return "delivered";
    return "";
  }, [orderStatus]);

  const handleStatusUpdateClick = useCallback(async () => {
    const newOrderStatus = nextOrderStatus();

    if (!newOrderStatus) {
      showInfoToast("Order already completed, nothing to update");

      return false;
    }

    await updateOrderStatus(order.orderId, newOrderStatus);

    showSuccessToast("Order status updated successfully");

    setOrderStatus(newOrderStatus);
  }, [nextOrderStatus, order.orderId]);

  return (
    <li className="bg-gray-100 rounded-md p-2 overflow-hidden flex flex-col">
      <div className="flex-1">
        <p className="truncate ... text-xs">Order ID: {order.orderId}</p>
        <p className="text-m font-bold text-green-500">
          ${computeOrderTotal(order.OrderItems)}
          <span
            className={`text-sm font-normal ${statusFontColor(orderStatus)} `}
          >
            {" "}
            — {orderStatus}
          </span>
        </p>
        <hr className="py-1" />
        <h3 className="text-sm font-semibold">Items:</h3>
        <ul>
          {order.OrderItems.map(({ Item, quantity }) => (
            <li key={Item.itemId}>
              <p className="text-sm flex gap-2">
                <span className="truncate ... flex-1 italic">
                  {Item.name} ({quantity})
                </span>
                <span className="italic">
                  ${computeItemTotal(+Item.price, quantity)}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`w-full text-sm center mt-2 py-2 bg-blue-700 hover:bg-blue-800 rounded-sm overflow-hidden text-white uppercase tracking-wide cursor-pointer ${
          nextOrderStatus() ? "" : "grayscale cursor-not-allowed"
        }`}
        onClick={handleStatusUpdateClick}
      >
        {nextOrderStatus() ? `Mark as ${nextOrderStatus()}` : "Order Completed"}
      </button>
    </li>
  );
};
