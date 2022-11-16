import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "../../../redux/reducers/dataSlice";
import {
  changeCurrency,
  fetchDefaultCurrency,
} from "../../../redux/reducers/storeSlice";
import "./currencyList.css";

const CurrencyList = (props) => {
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.data.currencies);
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);

  const curRef = useRef(null);
  const handleClickOutside = (e) => {
    if (props.isVisible && curRef.current && !curRef.current.contains(e.target))
      props.setVisible(false);
  };

  const pressToClose = (e) => {
    if (e.code === "Escape" && props.isVisible) props.setVisible(false);
  };

  useEffect(() => {
    if (!currencies) dispatch(fetchCurrencies());
    if (selectedCurrency === null) dispatch(fetchDefaultCurrency());

    document.body.addEventListener("mousedown", handleClickOutside, true);
    document.body.addEventListener("keydown", pressToClose, false);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside, true);
      document.body.removeEventListener("keydown", pressToClose, false);
    };
  });

  if (!currencies) return;
  const currentCurrency = currencies.find((currency) => {
    return currency.label === selectedCurrency.label;
  });

  function changeCurrencyHandler(setCurrency) {
    props.setVisible(false);
    dispatch(changeCurrency(setCurrency));
  }

  return (
    <div
      className="currencies"
      onClick={(e) => e.stopPropagation()}
      ref={curRef}
    >
      <span
        onClick={() => props.setVisible(!props.isVisible)}
        className={`currencies__selected-item${
          props.isVisible ? "_active" : ""
        }`}
      >
        {currentCurrency.symbol}
      </span>

      <ul
        className={`currencies__currency-list${
          !props.isVisible ? "_hidden" : ""
        }`}
      >
        {currencies.map((currency, id) => {
          return (
            <li key={id} onClick={() => changeCurrencyHandler(currency)}>
              {currency.symbol} {currency.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrencyList;
