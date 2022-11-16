import classNames from "classnames";
import React from "react";
import ProductAttributes from "../productAttributes/productAttributes";
import ProductGallery from "../productGallery/productGallery";
import ProductQuantity from "../productQuantity/productQuantity";
import "./productRow.css";

const ProductRow = (props) => {
  return (
    <div
      className={classNames("product-row", {
        "product-row_bag-compressed": props.type === "bag",
      })}
    >
      <div className="product-row__info">
        <h3
          className={classNames("product-row__title", {
            "product-row__title_bag-compressed": props.type === "bag",
          })}
        >
          {props.name}
        </h3>
        <span
          className={classNames("product-row__brand", {
            "product-row__brand_bag-compressed": props.type === "bag",
          })}
        >
          {props.brand}
        </span>
        <strong
          className={classNames("product-row__price", {
            "product-row__price_bag-compressed": props.type === "bag",
          })}
        >
          {props.price.currency.symbol + props.price.amount}
        </strong>
        <ProductAttributes
          selectedAttributes={props.selectedAttributes}
          attrs={props.attrs}
          selector={props.selector}
          type={props.type}
        />
      </div>

      <ProductQuantity
        id={props.id}
        quantity={props.quantity}
        selectedAttributes={props.selectedAttributes}
        selector={props.selector}
        type={props.type}
      />
      <ProductGallery
        gallery={props.gallery}
        type={props.type}
        switchers={true}
      />
    </div>
  );
};

export default ProductRow;
