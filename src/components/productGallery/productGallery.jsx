import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSwitcher from "../imageSwitcher/imageSwitcher";
import "./productGallery.css";

const ProductGallery = (props) => {
  const [indexImage, setIndexImage] = useState(0);
  const galleryLength = props.gallery.length;
  const cartLocation = useSelector(
    (state) => state.router.location.pathname.split("/")[2]
  );

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
      className={
        props.type === "cart"
          ? "product-gallery_cart-compressed"
          : "product-gallery"
      }
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

      <div className="gallery-container" draggable={false}>
        <img
          className={classNames("product-gallery__current-img", {
            "product-gallery__current-img_cart-compressed":
              props.type === "cart",
          })}
          src={props.gallery[indexImage]}
          draggable={false}
        />
        {props.gallery.length > 1 ? (
          <ImageSwitcher
            prevImage={prevImage}
            nextImage={nextImage}
            switchers={props.switchers}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductGallery;
