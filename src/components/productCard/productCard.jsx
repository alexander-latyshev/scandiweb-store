import React from "react";
import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Link className="product-card">
      <img src={props.image} />
      <h2>{props.name}</h2>
      <strong>{props.price}</strong>
    </Link>
  );
};

export default ProductCard;
