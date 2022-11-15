import React from "react";
import ProductAttributes from "../productAttributes/productAttributes";
import ProductGallery from "../productGallery/productGallery";
import ProductQuantity from "../productQuantity/productQuantity";
import "./productRow.css";

const ProductRow = (props) => {
  return (
    <div className="product-row">
      <div className="product-row__info">
        <h3 className="product-row__title">{props.name}</h3>
        <span className="product-row__brand">{props.brand}</span>
        <strong className="product-row__price">
          {props.price.currency.symbol + props.price.amount}
        </strong>
        <ProductAttributes
          selectedAttributes={props.selectedAttributes}
          attrs={props.attrs}
          selector={props.selector}
        />
      </div>

      <ProductQuantity
        id={props.id}
        quantity={props.quantity}
        selectedAttributes={props.selectedAttributes}
        selector={props.selector}
      />
      <ProductGallery gallery={props.gallery} switchers={true} type={"cart"} />
    </div>
  );
};

export default ProductRow;
