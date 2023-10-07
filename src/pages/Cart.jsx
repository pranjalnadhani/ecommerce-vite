import { useContext } from "react";
import CartContext from "../contexts/Cart/Context";
import { useNavigate } from "react-router-dom";

export function Cart() {
  const { cart, incrementQuantity, decrementQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  async function checkout() {
    fetch("http://localhost:3000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart.map((product) => ({
          id: product.id,
          quantity: product.quantity,
        })),
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          clearCart();
          navigate("/orders");
          alert("Order Placed Successfully!");
        } else {
          alert("Order Failed!");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Order Failed!");
      });
  }

  return (
    <div className="m-4 rounded-lg border border-gray-300 p-4">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-2">
        {cart.map((product) => (
          <li key={product.id} className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-16 w-16 object-contain bg-white rounded-full p-2"
              />
              <div>
                <h2 className="text-md font-bold">{product.title}</h2>
                <p className="text-gray-700">₹{product.price}</p>
              </div>
            </div>
            <div className="border border-gray-500 rounded-full flex items-center gap-x-1 overflow-hidden">
              <button
                className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={function decrement() {
                  decrementQuantity(product.id);
                }}
              >
                -
              </button>
              <span className="px-2">{product.quantity}</span>
              <button
                className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={function increment() {
                  incrementQuantity(product.id);
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-right mt-4">
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={checkout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
