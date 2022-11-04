import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./reducers/cartSlice";
import { fetchData } from "./reducers/dataSlice";

export const store = configureStore({
  reducer: {
    data: fetchData.reducer,
    cart: cartSlice.reducer,
  },
});
