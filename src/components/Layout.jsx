import PropTypes from "prop-types";
import { useContext } from "react";
import CartContext from "../contexts/Cart/Context";
import { Link } from "react-router-dom";

export function Layout({ children }) {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div>
      <div className="bg-gray-600 text-white flex justify-between p-4 text-sm items-center">
        <Link to="/">E-commerce</Link>
        <ul className="flex gap-x-4 text-xs items-center">
          <li>
            <Link to="/cart" className="bg-gray-900 text-white px-2 py-1 rounded-lg">
              Cart ({cart.length})
            </Link>
          </li>
          <li>
            <button
              className="bg-gray-900 text-white px-2 py-1 rounded-lg"
              onClick={clearCart}
            >
              Clear
            </button>
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
