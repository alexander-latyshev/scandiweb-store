import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductAttributes from "../../components/productAttributes/productAttributes";
import { fetchProduct } from "../../redux/reducers/dataSlice";
import { Interweave } from "interweave";
import ProductGallery from "../../components/productGallery/productGallery";
import "./productPage.css";

const ProductPage = () => {
  const dispatch = useDispatch();
  const productID = useSelector(
    (state) => state.router.location.pathname.split("/")[2]
  );
  const product = useSelector((state) => state.data.currentProduct);
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    dispatch(fetchProduct(productID));
  }, [product]);

  useEffect(() => {
    const setAttributes = product
      ? product.attributes.map((attribute) => {
          return {
            ...attribute,
            attribute: attribute.id,
            item: attribute.items[0].id,
          };
        })
      : null;
    setSelectedAttributes(setAttributes);
  }, [product, selectedAttributes && selectedAttributes.length]);

  if (!product) return;
  const currentPrice = product.prices.find((price) => {
    return price.currency.label === selectedCurrency;
  });

  function setAttribute(attrID, itemID) {
    const setAttribute = selectedAttributes.map((attr) => {
      if (attr.id !== attrID) return attr;
      return {
        ...attr,
        attribute: attr.id,
        item: itemID,
      };
    });
    setSelectedAttributes(setAttribute);
  }

  console.log(product);

  return (
    <section className="product-page">
      <ProductGallery gallery={product.gallery} thumb={true} />

      <div className="product-info">
        <h2 className="product-info__title">{product.name}</h2>
        <span className="product-info__brand">{product.brand}</span>
        <ProductAttributes
          attrs={product.attributes}
          selectedAttributes={selectedAttributes}
          setAttribute={setAttribute}
        />
        <strong className="product-info__price">
          price:
          <p>
            {currentPrice
              ? currentPrice.currency.symbol + currentPrice.amount
              : null}
          </p>
        </strong>
        <button className="product-page__add-cart">Add to cart</button>
        <Interweave
          content={product.description}
          className="product-page__description"
        />
      </div>
    </section>
  );
};

export default ProductPage;
