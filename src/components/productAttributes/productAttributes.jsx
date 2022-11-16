import React from "react";
import "./productAttributes.css";
import classNames from "classnames";

const ProductAttributes = (props) => {
  if (!props) return;
  return (
    <>
      {props.attrs.map((attribute, id) => {
        return (
          <div
            key={id}
            className={classNames("attributes-set", {
              "attributes-set__bag-compressed": props.type === "bag",
            })}
          >
            <h3
              className={classNames("attributes-set__title", {
                "attributes-set__title_bag-compressed": props.type === "bag",
              })}
            >
              {attribute.name}:
            </h3>
            <div className="attributes-container">
              {attribute.items.map((item, id) => {
                const isSelected = props.selectedAttributes
                  ? props.selectedAttributes.some((selectedAttr) => {
                      return (
                        selectedAttr.attribute === attribute.name &&
                        selectedAttr.item === item.id
                      );
                    })
                  : null;

                return (
                  <button
                    key={id}
                    className={classNames("", {
                      "attributes-set__text-btn": attribute.type !== "swatch",
                      "attributes-set__swatch-btn": attribute.type === "swatch",
                      "attributes-set__text-btn_active":
                        isSelected && attribute.type !== "swatch",
                      "attributes-set__swatch-btn_active":
                        isSelected && attribute.type === "swatch",
                      // "attributes-set__text-btn_bag-compressed":
                      //   attribute.type !== "swatch" && props.type === "bag",
                      "attributes-set__swatch-btn_bag-compressed":
                        attribute.type === "swatch" && props.type === "bag",
                    })}
                    style={{
                      backgroundColor:
                        attribute.type === "swatch" ? item.value : null,
                    }}
                    onClick={
                      props.selector
                        ? () => props.setAttribute(attribute.id, item.id)
                        : null
                    }
                    draggable={false}
                  >
                    {attribute.type !== "swatch" ? item.value : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductAttributes;
