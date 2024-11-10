"use client";

import useSWR from "swr";
import { fetchCustomerDetails } from "@/services/customerService";
import { useParams } from "next/navigation";
import { fetchOrders } from "@/services/orderService";
import { UserMeta } from "@/components/userMeta";
import { OrderCard } from "@/components/orderCard";

const CustomerPage = () => {
  const { id } = useParams();

  const { data: customer } = useSWR(id ? `/customers/${id}` : null, () =>
    fetchCustomerDetails(id as string)
  );

  const { data: orders } = useSWR(id ? `/customers/${id}/orders` : null, () =>
    fetchOrders(id as string)
  );

  if (!customer || !orders) return <p>Loading...</p>;

  return (
    <div className="py-4">
      <h1 className="font-bold text-2xl mb-4">
        {customer.name}&apos;s Profile
      </h1>
      <div className="grid grid-cols-3 gap-10 mb-10">
        <UserMeta metaKey="Email" metaValue={customer.email} />
        <UserMeta metaKey="Phone" metaValue={customer.phone} />
        <UserMeta metaKey="Address" metaValue={customer.address} />
      </div>

      <h2 className="text-lg font-bold mb-3">
        {orders.length} {orders.length === 1 ? "Order" : "Orders"}
      </h2>
      <div className="">
        <ul className="w-full grid grid-cols-4 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.orderId} order={order} />
          ))}
          <OrderCard key={orders[0].orderId} order={orders[0]} />
        </ul>
      </div>
    </div>
  );
};

export default CustomerPage;
