import React, { useEffect } from "react";
import "./categoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/dataSlice";
import { Triangle } from "react-loader-spinner";
import ProductCard from "../../components/productCard/productCard";
import { addProductToCart } from "../../redux/reducers/storeSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.router.location.pathname.split("/")[1]
  );
  const location = useSelector((state) => state.router.location.pathname);
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const products = useSelector((state) => state.data.products);
  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  });

  const addToCartHandler = (event, product) => {
    event.preventDefault();
    const setAttributes = product.attributes.map((attribute) => {
      return {
        ...attribute,
        attribute: attribute.id,
        item: attribute.items[0].id,
      };
    });

    const newProduct = {
      product: { ...product, quantity: 1 },
      selectedAttributes: setAttributes,
    };

    dispatch(addProductToCart(newProduct));
  };

  if (!products)
    return (
      <Triangle
        height={60}
        width={60}
        color="#5ece7b"
        wrapperStyle={{ margin: 100 }}
      />
    );

  return (
    <section className="category">
      <h1>{selectedCategory}</h1>

      <div className="category-products">
        {products.map((product, id) => {
          if (!product) return;
          const price = product.prices.find((value) => {
            return selectedCurrency
              ? value.currency.label === selectedCurrency.label
              : null;
          });
          return (
            <ProductCard
              key={id}
              name={product.name}
              image={product.gallery[0]}
              price={price ? price.currency.symbol + price.amount : null}
              link={location + "/" + product.id}
              onClick={(event) => event.stopPropagation()}
              addToCart={addToCartHandler}
              product={product}
              inStock={product.inStock}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CategoryPage;
