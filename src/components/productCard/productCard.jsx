import React from "react";
import "./productCard.css";
import { Link } from "react-router-dom";
import classNames from "classnames";

const ProductCard = (props) => {
  return (
    <Link
      className={classNames("product-card", {
        "product-card_out-stock": !props.inStock,
      })}
      to={props.link}
      draggable={false}
    >
      <img src={props.image} draggable={false} />
      <h2>{props.name}</h2>
      <strong>{props.price}</strong>
      {props.inStock ? (
        <button onClick={(event) => props.addToCart(event, props.product)} />
      ) : null}
    </Link>
  );
};

export default ProductCard;
