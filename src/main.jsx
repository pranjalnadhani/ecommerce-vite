import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CartProvider from "./contexts/Cart/Provider";
import "./globals.css";
import { Cart } from "./pages/Cart";
import { HomePage } from "./pages/HomePage";
import { ProductDetailsPage } from "./pages/ProductDetails";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
