import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./dropdownCart.css";
import ProductRow from "../../productRow/productRow.jsx";
import { Scrollbar } from "react-scrollbars-custom";

const DropdownCart = (props) => {
  const bagRef = useRef(null);
  const currentCategory = useSelector(
    (state) => state.router.location.pathname.split("/")[1]
  );
  const cartTotalQuantity = useSelector(
    (state) => state.store.cartTotalQuantity
  );
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const cartProducts = useSelector((state) => state.store.cartProducts);
  const totalPrice = cartProducts.reduce((prev, next) => {
    const productPrice = next.product.prices.find((value) => {
      return value.currency.label === selectedCurrency.label;
    });
    return prev + productPrice.amount * next.quantity;
  }, 0);

  const pressToClose = (e) => {
    if (e.code === "Escape" && props.isVisible) props.setVisible(false);
  };

  const handleClickOutside = (e) => {
    if (props.isVisible && bagRef.current && !bagRef.current.contains(e.target))
      props.setVisible(false);
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
      ref={bagRef}
    >
      {cartTotalQuantity !== 0 ? (
        <span className="dropdown-cart__count">{cartTotalQuantity}</span>
      ) : null}

      <div
        className="dropdown-cart__btn"
        onClick={() => props.setVisible(!props.isVisible)}
      >
        {props.isVisible ? (
          <div
            className="dropdown-cart__menu"
            onClick={(event) => event.stopPropagation()}
          >
            {cartTotalQuantity === 0 ? (
              <h1 className="dropdown-cart__empty-cart-title">
                Cart bag is empty
              </h1>
            ) : (
              <>
                <h1 className="dropdown-cart__title">
                  {"My Bag, "}
                  <span>
                    {cartTotalQuantity}
                    {cartTotalQuantity !== 1 ? " items" : " item"}
                  </span>
                </h1>

                <div className="dropdown-cart__products-list">
                  <Scrollbar style={{ width: "100%", height: 420 }}>
                    {cartProducts.map((item, index) => {
                      const product = item.product;
                      const price = product.prices.find((value) => {
                        return value.currency.label === selectedCurrency.label;
                      });
                      return (
                        <ProductRow
                          key={index}
                          price={price}
                          name={product.name}
                          brand={product.brand}
                          selectedAttributes={item.selectedAttributes}
                          attrs={product.attributes}
                          gallery={product.gallery}
                          id={product.id}
                          quantity={item.quantity}
                          item={item}
                          type={"bag"}
                        />
                      );
                    })}
                  </Scrollbar>
                </div>

                <div className="dropdown-cart__total">
                  <span>Total:</span>
                  <span>{selectedCurrency.symbol + totalPrice.toFixed(2)}</span>
                </div>
                <div className="dropdown-cart__btns">
                  <button
                    to={""}
                    onClick={() => props.setVisible(false)}
                    className="dropdown-cart__view-btn"
                  >
                    View Bag
                  </button>
                  <Link
                    to={currentCategory + "/cart"}
                    onClick={() => props.setVisible(false)}
                    className="dropdown-cart__check-btn"
                  >
                    Check out
                  </Link>
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownCart;
