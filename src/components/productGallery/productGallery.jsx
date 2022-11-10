import React from "react";
import { useState } from "react";
import ImageSwitcher from "../imageSwitcher/imageSwitcher";
import "./productGallery.css";

const ProductGallery = (props) => {
  const [indexImage, setIndexImage] = useState(0);
  const handleChangeImage = (index) => {
    return setIndexImage(index);
  };
  return (
    <div className="product-gallery">
      {props.thumb && props.gallery.length > 1 ? (
        <div className="product-gallery__thumb">
          {props.gallery.map((img, index) => {
            return (
              <img
                src={img}
                className={
                  index === indexImage
                    ? "product-gallery__img_active"
                    : "product-gallery__img"
                }
                key={index}
                onClick={() => handleChangeImage(index)}
                draggable={false}
              />
            );
          })}
        </div>
      ) : null}

      <div className="product-gallery__image-container">
        <img
          className="product-gallery__current-img"
          src={props.gallery[indexImage]}
          draggable={false}
        />
        <ImageSwitcher
          index={indexImage}
          setIndex={setIndexImage}
          switchers={props.switchers}
          length={props.gallery.length}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
{
  /* <div className="button-wrapper">
              <button onClick={() => prevImage()}>-</button>
              <button onClick={() => nextImage()}>+</button>
            </div>; */
}
