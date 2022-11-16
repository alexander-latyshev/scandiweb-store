import classNames from "classnames";
import React from "react";
import { useState } from "react";
import ImageSwitcher from "../imageSwitcher/imageSwitcher";
import "./productGallery.css";

const ProductGallery = (props) => {
  const [indexImage, setIndexImage] = useState(0);
  const galleryLength = props.gallery.length;

  const handleChangeImage = (index) => {
    return setIndexImage(index);
  };

  const prevImage = () => {
    if (indexImage === 0) {
      return setIndexImage(galleryLength - 1);
    }
    return setIndexImage(indexImage - 1);
  };

  const nextImage = () => {
    if (indexImage > galleryLength - 2) {
      return setIndexImage(0);
    }
    return setIndexImage(indexImage + 1);
  };
  return (
    <div
      className={classNames("product-gallery", {
        "product-gallery_cart-compressed": props.type === "cart",
        "product-gallery_bag-compressed": props.type === "bag",
      })}
    >
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

      <div
        className={classNames("gallery-container", {
          "gallery-container_bag-compressed": props.type === "bag",
          "gallery-container_cart-compressed": props.type === "cart",
        })}
        draggable={false}
      >
        <img
          className={classNames("product-gallery__current-img", {
            "product-gallery__current-img_cart-compressed":
              props.type === "cart",
            "product-gallery__current-img_bag-compressed": props.type === "bag",
          })}
          src={props.gallery[indexImage]}
          draggable={false}
        />
        {props.gallery.length > 1 ? (
          <ImageSwitcher
            prevImage={prevImage}
            nextImage={nextImage}
            switchers={props.switchers}
            type={props.type}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductGallery;
