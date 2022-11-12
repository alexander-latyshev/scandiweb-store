import React from "react";
import { useState } from "react";
import ImageSwitcher from "../imageSwitcher/imageSwitcher";
import "./productGallery.css";

const ProductGallery = (props) => {
  const [indexImage, setIndexImage] = useState(0);
  const handleChangeImage = (index) => {
    return setIndexImage(index);
  };
  const galleryLength = props.gallery.length;

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

      <div className="product-gallery__gallery-container" draggable={false}>
        <img
          className="product-gallery__current-img"
          src={props.gallery[indexImage]}
          draggable={false}
        />
        <ImageSwitcher
          prevImage={prevImage}
          nextImage={nextImage}
          switchers={props.switchers}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
