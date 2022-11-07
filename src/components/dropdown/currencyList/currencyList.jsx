import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrencies } from "../../../redux/reducers/dataSlice";
import {
  changeCurrency,
  fetchDefaultCurrency,
} from "../../../redux/reducers/storeSlice";
import "./currencyList.css";

const CurrencyList = () => {
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const currencies = useSelector((state) => state.data.currencies);
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const listRef = useRef(null);
  const handleClickOutside = (event) => {
    if (isVisible && listRef.current && !listRef.current.contains(event.target))
      setVisible(false);
  };
  const pressToClose = (event) => {
    if (event.code === "Escape" && isVisible) setVisible(false);
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
    return currency.label === selectedCurrency;
  });

  function changeCurrencyHandler(setCurrency) {
    setVisible(false);
    dispatch(changeCurrency(setCurrency));
  }
  
  return (
    <div
      className="currencies"
      onClick={(e) => e.stopPropagation()}
      ref={listRef}
    >
      <span
        onClick={() => setVisible(!isVisible)}
        className={`currencies__selected-item${isVisible ? "_active" : ""}`}
      >
        {currentCurrency.symbol}
      </span>

      <ul className={`currencies__currency-list${!isVisible ? "_hidden" : ""}`}>
        {currencies.map((currency, id) => {
          return (
            <li key={id} onClick={() => changeCurrencyHandler(currency.label)}>
              {currency.symbol} {currency.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrencyList;
