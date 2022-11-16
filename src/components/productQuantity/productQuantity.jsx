import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import {
  changeProductQuantity,
  removeProduct,
} from "../../redux/reducers/storeSlice";
import "./productQuantity.css";

const ProductQuantity = (props) => {
  const dispatch = useDispatch();
  return (
    <div
      className={classNames("product-quantity", {
        "product-quantity_bag-compressed": props.type === "bag",
      })}
    >
      <button
        className={classNames("product-quantity__btn", {
          "product-quantity__btn_bag-compressed": props.type === "bag",
        })}
        onClick={() =>
          dispatch(
            changeProductQuantity({
              id: props.id,
              count: +1,
              selectedAttributes: props.selectedAttributes,
            })
          )
        }
      />
      <span>{props.quantity}</span>
      <button
        className={classNames("product-quantity__btn", {
          "product-quantity__btn_bag-compressed": props.type === "bag",
          "product-quantity__remove-btn": props.quantity === 1,
        })}
        onClick={
          props.quantity > 1
            ? () =>
                dispatch(
                  changeProductQuantity({
                    id: props.id,
                    count: -1,
                    selectedAttributes: props.selectedAttributes,
                  })
                )
            : () =>
                dispatch(
                  removeProduct({
                    id: props.id,
                    selectedAttributes: props.selectedAttributes,
                  })
                )
        }
      >
        {props.quantity === 1 ? "del" : null}
      </button>
    </div>
  );
};

export default ProductQuantity;
