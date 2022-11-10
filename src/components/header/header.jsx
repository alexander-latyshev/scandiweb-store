import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryNames } from "../../redux/reducers/dataSlice";
import { Link, Navigate } from "react-router-dom";
import { Triangle } from "react-loader-spinner";
import logo from "../../assets/store-logo.svg";
import "./header.css";
import CurrencyList from "../dropdown/currencyList/currencyList";
import DropdownCart from "../dropdown/dropdownCart/dropdownCart";

const Header = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.router.location.pathname);
  const categories = useSelector((state) => state.data.categoryNames);
  useEffect(() => {
    dispatch(fetchCategoryNames());
  }, []);

  if (!categories) {
    return (
      <Triangle
        height={60}
        width={60}
        color="#5ece7b"
        wrapperStyle={{ margin: 10 }}
      />
    );
  }

  if (location === "/") return <Navigate to={categories[0].name} />;
  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__pagination-links">
          {categories
            ? categories.map((category, id) => {
                return (
                  <Link
                    to={"/" + category.name}
                    key={id}
                    className={
                      category.name === location.split("/")[1]
                        ? "header__link_acitve"
                        : ""
                    }
                    draggable={false}
                  >
                    {category.name}
                  </Link>
                );
              })
            : null}
        </nav>

        <img src={logo} className="header__logo" draggable={false} />

        <div className="header__dropdown">
          <CurrencyList />
          <DropdownCart />
        </div>
      </div>
    </header>
  );
};

export default Header;
