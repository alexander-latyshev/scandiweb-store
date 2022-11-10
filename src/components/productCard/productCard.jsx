import React from "react";
import "./productCard.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Link className="product-card" to={props.link} draggable={false}>
      <img src={props.image} draggable={false} />
      <h2>{props.name}</h2>
      <strong>{props.price}</strong>
      <button />
    </Link>
  );
};

export default ProductCard;
