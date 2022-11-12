import React from "react";
import "./productAttributes.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

const ProductAttributes = (props) => {
  if (!props) return;
  return (
    <>
      {props.attrs.map((attribute, id) => {
        return (
          <div key={id} className="attributes-set">
            <h3 className="attributes-set__title">{attribute.name}:</h3>
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
                    })}
                    style={{
                      backgroundColor:
                        attribute.type === "swatch" ? item.value : null,
                    }}
                    onClick={() => props.setAttribute(attribute.id, item.id)}
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
