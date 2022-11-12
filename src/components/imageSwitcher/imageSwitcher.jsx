import React from "react";
import "./imageSwitcher.css";

const ImageSwitcher = (props) => {
  return (
    <>
      {props.switchers ? (
        <div className="image-switchers">
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
