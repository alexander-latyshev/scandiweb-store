import classNames from "classnames";
import React from "react";
import "./imageSwitcher.css";

const ImageSwitcher = (props) => {
  return (
    <>
      {props.switchers ? (
        <div
          className={classNames("image-switchers", {
            "image-switchers_bag-compressed": props.type === "bag",
          })}
        >
          <button
            className="image-switchers__switch-btn"
            onClick={() => props.prevImage()}
          />
          <button
            className="image-switchers__switch-btn"
            onClick={() => props.nextImage()}
          />
        </div>
      ) : null}
    </>
  );
};

export default ImageSwitcher;
