import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/reducers/dataSlice";
import ProductAttributes from "../../components/productAttributes/productAttributes";
import ProductGallery from "../../components/productGallery/productGallery";
import { Interweave } from "interweave";
import "./productPage.css";
import { addProductToCart } from "../../redux/reducers/storeSlice";

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
    return selectedCurrency
      ? price.currency.label === selectedCurrency.label
      : null;
  });

  const addToCart = () => {
    const newProduct = {
      product: product,
      selectedAttributes: selectedAttributes,
    };

    dispatch(addProductToCart(newProduct));
  };

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
          selector={true}
        />
        <strong className="product-info__price">
          price:
          <p>
            {currentPrice
              ? currentPrice.currency.symbol + currentPrice.amount
              : null}
          </p>
        </strong>
        {product.inStock ? (
          <button
            className="product-page__add-cart"
            onClick={() => addToCart()}
          >
            Add to cart
          </button>
        ) : (
          <button className="product-page__add-cart_out-stock">
            Out stock
          </button>
        )}
        <Interweave
          content={product.description}
          className="product-page__description"
        />
      </div>
    </section>
  );
};

export default ProductPage;
