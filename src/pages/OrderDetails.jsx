import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function OrderDetails() {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/orders/${orderId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "success") {
          setOrder(response.data.order);
        } else {
          alert("Could not fetch the order details");
          console.error(response.error);
        }
      });
  }, [orderId]);

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-4">Your Orders</h1>
      {order ? (
        <div className="rounded-lg border border-gray-300 p-4">
          <ul className="space-y-2">
            {order.orderItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-x-2">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="h-16 w-16 object-contain bg-white rounded-full p-2"
                  />
                  <div>
                    <h2 className="text-md font-bold">{item.product.title}</h2>
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Price:</span>
                      <span> ₹{item.product.price.toFixed(2)}, </span>
                      <span className="font-semibold">Quantity:</span>
                      <span> {item.quantity}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 font-medium">
                    <span> ₹{(item.product.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <hr className="my-4" />
          <div className="text-right">
            <p className="text-gray-900 font-medium">
              <span className="font-semibold">
                {" "}
                ₹
                {order.orderItems.reduce(function (sum, item) {
                  return sum + item.product.price * item.quantity;
                }, 0).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
