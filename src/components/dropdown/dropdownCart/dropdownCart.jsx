import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./dropdownCart.css";

const DropdownCart = () => {
  const [isVisible, setVisible] = useState(false);
  const cartRef = useRef(null);
  const handleClickOutside = (event) => {
    if (isVisible && cartRef.current && !cartRef.current.contains(event.target))
      setVisible(false);
  };
  const pressToClose = (event) => {
    if (event.code === "Escape" && isVisible) setVisible(false);
  };

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClickOutside, true);
    document.body.addEventListener("keydown", pressToClose, false);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside, true);
      document.body.removeEventListener("keydown", pressToClose, false);
    };
  });

  return (
    <div
      className="dropdown-cart"
      onClick={(event) => event.stopPropagation()}
      ref={cartRef}
    >
      <div
        className="dropdown-cart__btn"
        onClick={() => setVisible(!isVisible)}
      >
        {isVisible ? (
          <div
            className="dropdown-cart__menu"
            onClick={(event) => event.stopPropagation()}
          >
            <h1>BAG</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownCart;
//// isVisible && event.code === "Escape"? setVisible(false): null
