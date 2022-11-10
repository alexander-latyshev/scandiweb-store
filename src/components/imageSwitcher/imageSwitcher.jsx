import React from "react";
import "./imageSwitcher.css";

const ImageSwitcher = (props) => {
  const length = props.length;
  const prevImage = () => {
    if (props.index === 0) {
      return props.setIndex(length - 1);
    }
    return props.setIndex(props.index - 1);
  };

  const nextImage = () => {
    if (props.index > length - 2) {
      return props.setIndex(0);
    }
    return props.setIndex(props.index + 1);
  };

  return (
    <>
      {props.switchers ? (
        <div className="image-switchers">
          <button
            className="image-switchers__switch-btn"
            onClick={() => prevImage()}
          />
          <button
            className="image-switchers__switch-btn"
            onClick={() => nextImage()}
          />
        </div>
      ) : null}
    </>
  );
};

export default ImageSwitcher;
