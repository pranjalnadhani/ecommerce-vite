import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../contexts/Cart/Context";

export function ProductDetailsPage() {
  const [productDetails, setProductDetails] = useState({});
  const { productId } = useParams();
  const { getProduct, addToCart, incrementQuantity, decrementQuantity } =
    useContext(CartContext);
  const cartProduct = getProduct(Number(productId));

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((response) => response.json())
      .then((response) => setProductDetails(response.data.product));
  }, [productId]);

  return (
    <div className="m-4">
      <div className="flex gap-8">
        <img
          src={productDetails.imageUrl}
          alt={productDetails.name}
          className="h-96 w-96 object-contain p-4 bg-white rounded-lg border border-gray-300"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productDetails.title}</h1>
          <p className="text-gray-700 text-sm mt-4">
            {productDetails.description}
          </p>
          <p className="text-gray-700 text-3xl font-bold mt-8 mb-6">
            ₹{productDetails.price}
          </p>
          <span className="text-gray-700 bg-gray-200 px-3 py-2 rounded-lg text-xs">
            Only {productDetails.stock} Left!
          </span>
          <div className="mt-8">
            {cartProduct ? (
              <div className="space-x-2 border border-gray-500 p-2 rounded-lg inline-block">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  onClick={function decrement() {
                    decrementQuantity(cartProduct.id);
                  }}
                >
                  -
                </button>
                <span className="px-2">{cartProduct.quantity}</span>
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                  onClick={function increment() {
                    incrementQuantity(cartProduct.id);
                  }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded-lg"
                onClick={function addProductToCart() {
                  addToCart({
                    id: productDetails.id,
                    title: productDetails.title,
                    price: productDetails.price,
                    imageUrl: productDetails.imageUrl,
                    quantity: 1,
                  });
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
