import React from "react";
import "./categoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/reducers/dataSlice";
import { Triangle } from "react-loader-spinner";
import ProductCard from "../../components/productCard/productCard";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.router.location.pathname.split("/")[1]
  );
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const products = useSelector((state) => state.data.products);
  useEffect(() => {
    dispatch(fetchProducts(selectedCategory));
  });

  if (!products)
    return (
      <Triangle
        height={60}
        width={60}
        color="#5ece7b"
        wrapperStyle={{ margin: 10 }}
      />
    );
  // console.log(selectedCurrency);
  return (
    <section className="category">
      <h1>{selectedCategory}</h1>

      <div className="category-products">
        {products.map((product, id) => {
          if (!product) return;
          const price = product.prices.find((value) => {
            return value.currency.label === selectedCurrency;
          });
          // if (!price) return;
          // return <span key={id}>{product.name}</span>;

          return (
            <ProductCard
              key={id}
              name={product.name}
              image={product.gallery[0]}
              price={price ? price.currency.symbol + price.amount : null}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CategoryPage;
