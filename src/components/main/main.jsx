import React from "react";
import "./main.css";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "../../pages/categoryPage/categoryPage";
import ProductPage from "../../pages/productPage/productPage";
import CartPage from "../../pages/cartPage/cartPage";

const Main = () => {

  return (
    <main className="main">
      <Routes>
        <Route element={<CategoryPage />} path="/:categoryName" />
        <Route element={<ProductPage />} path="/:categoryName/:productId" />
        <Route element={<CartPage />} path="/:categoryName/cart" />
      </Routes>
    </main>
  );
};

export default Main;
