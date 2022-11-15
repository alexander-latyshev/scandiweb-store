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
    <div className="product-quantity">
      <button
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
      />
    </div>
  );
};

export default ProductQuantity;
