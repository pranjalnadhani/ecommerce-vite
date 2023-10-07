import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/orders", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "success") {
          setOrders(response.data.orders);
        } else {
          alert("Could not fetch your orders");
          console.error(response.error);
        }
      });
  }, []);

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      <ul className="space-y-3">
        {orders.map((order) => (
          <li key={order.id} className="rounded-lg border border-gray-300 p-4">
            <div className="flex justify-between items-start">
              <Link to={`/orders/${order.id}`}>
                <h2 className="mb-2 font-bold text-lg">Order #{order.id}</h2>
              </Link>
              <span className="p-2 font-semibold text-white bg-gray-500 rounded-lg text-xs">
                {order.status}
              </span>
            </div>
            <div className="text-sm">Ordered at: {new Date(order.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
