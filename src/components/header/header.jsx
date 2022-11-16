import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryNames } from "../../redux/reducers/dataSlice";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/store-logo.svg";
import "./header.css";
import CurrencyList from "../dropdown/currencyList/currencyList";
import DropdownCart from "../dropdown/dropdownCart/dropdownCart";
import { useState } from "react";
import classNames from "classnames";

const Header = () => {
  const dispatch = useDispatch();
  const [isCurVisible, setCurVisible] = useState(false);
  const [isBagVisible, setBagVisible] = useState(false);
  const location = useSelector((state) => state.router.location.pathname);
  const categories = useSelector((state) => state.data.categoryNames);

  useEffect(() => {
    dispatch(fetchCategoryNames());
  }, []);

  if (!categories) return;

  if (location === "/") return <Navigate to={categories[0].name} />;
  return (
    <header className="header">
      <div
        className={classNames("header__backdrop", {
          header__backdrop_active: isBagVisible || isCurVisible,
        })}
      />
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
          <CurrencyList isVisible={isCurVisible} setVisible={setCurVisible} />
          <DropdownCart isVisible={isBagVisible} setVisible={setBagVisible} />
        </div>
      </div>
    </header>
  );
};

export default Header;
