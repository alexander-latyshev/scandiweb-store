import React from "react";
import "./main.css";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "../../pages/categoryPage/categoryPage";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route element={<CategoryPage />} path="/:categoryName" />
      </Routes>
    </main>
  );
};

export default Main;
