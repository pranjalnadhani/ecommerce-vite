import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailsPage } from "./pages/ProductDetails";
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
