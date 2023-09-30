import PropTypes from "prop-types";

export function Layout({ children }) {
  return (
    <div>
      <div className="bg-gray-600 text-white flex justify-between p-4 text-sm items-center">
        <span>E-commerce</span>
        <ul className="flex gap-x-4 text-xs">
            <li>Cart</li>
            <li>Sign In</li>
        </ul>
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
