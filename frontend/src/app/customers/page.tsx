"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchCustomersDetails } from "../../services/customerService";

const CustomersPage = () => {
  const { data: customers, error } = useSWR(
    "/customers",
    fetchCustomersDetails
  );

  if (error) return <p>Failed to load customers.</p>;
  if (!customers) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {customers.map((customer) => (
          <div
            key={customer.customerId}
            className="border rounded-lg p-4 shadow-lg bg-white"
          >
            <h2 className="text-lg font-semibold">{customer.name}</h2>
            <p className="text-gray-600 text-xs py-1">
              Email: {customer.email}
            </p>
            <p className="text-gray-600 text-xs py-1">
              Phone: {customer.phone}
            </p>
            <Link href={`/customers/${customer.customerId}`}>
              <button className="mt-3 bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 uppercase tracking-md">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
