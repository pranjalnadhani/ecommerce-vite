import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailsPage } from "./pages/ProductDetails";
import "./globals.css";
import { Layout } from "./components/Layout";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </React.StrictMode>
);
