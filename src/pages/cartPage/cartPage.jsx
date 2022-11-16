import React from "react";
import "./cartPage.css";
import { useSelector } from "react-redux";
import ProductRow from "../../components/productRow/productRow";

const CartPage = () => {
  const cartProducts = useSelector((state) => state.store.cartProducts);
  const selectedCurrency = useSelector((state) => state.store.selectedCurrency);
  const totalQuantity = useSelector((state) => state.store.cartTotalQuantity);
  const totalPrice = cartProducts.reduce((prev, next) => {
    const productPrice = next.product.prices.find((value) => {
      return value.currency.label === selectedCurrency.label;
    });
    return prev + productPrice.amount * next.quantity;
  }, 0);

  return (
    <section className="cart">
      {cartProducts.length === 0 ? (
        <h1 className="cart__empty-cart-title">No products in the cart</h1>
      ) : (
        <>
          <h1 className="cart__title">cart</h1>
          <div className="cart__products-list">
            {cartProducts.map((item, index) => {
              if (!item) return;
              const product = item.product;
              const price = product.prices.find((value) => {
                return value.currency.label === selectedCurrency.label;
              });

              return (
                <ProductRow
                  key={index}
                  price={price}
                  name={product.name}
                  brand={product.brand}
                  selectedAttributes={item.selectedAttributes}
                  attrs={product.attributes}
                  gallery={product.gallery}
                  id={product.id}
                  quantity={item.quantity}
                  item={item}
                  type={"cart"}
                />
              );
            })}
          </div>

          <div className="cart-payment">
            <span>
              <h4>Tax 21%:</h4>
              <strong>
                {selectedCurrency.symbol}
                {((totalPrice / 100) * 21).toFixed(2)}
              </strong>
            </span>

            <span>
              <h4>Quantity:</h4>
              <strong>{totalQuantity}</strong>
            </span>

            <span>
              <h4>Total:</h4>
              <strong>{selectedCurrency.symbol + totalPrice.toFixed(2)}</strong>
            </span>
            <button className="cart-payment__btn">order</button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
