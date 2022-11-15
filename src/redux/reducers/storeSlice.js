import { FETCH_CURRENCIES } from "../../apollo/queries";
import {
  createAsyncThunk,
  createSlice,
  current,
  original,
} from "@reduxjs/toolkit";
import client from "../../apollo/client";
import _ from "lodash";

const initialState = {
  selectedCurrency: null,
  cartProducts: [],
  cartTotalQuantity: 0,
};

export const fetchDefaultCurrency = createAsyncThunk(
  "store/fetchDefaultCurrency",
  async () => {
    const response = await client.query({
      query: FETCH_CURRENCIES,
    });
    return response.data.currencies[0];
  }
);

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    },

    addProductToCart: (state, { payload }) => {
      let isSameProduct = false;
      const newCartProducts = state.cartProducts.map((item) => {
        const isEqual = _.isEqual(
          item.selectedAttributes,
          payload.selectedAttributes
        );

        if (item.product.id === payload.product.id && isEqual) {
          isSameProduct = true;
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      if (!isSameProduct || newCartProducts.length === 0) {
        state.cartProducts.push({ ...payload, quantity: 1 });
        state.cartTotalQuantity += 1;
      } else {
        return {
          ...state,
          cartProducts: newCartProducts,
          cartTotalQuantity: state.cartTotalQuantity + 1,
        };
      }
    },

    changeProductQuantity: (state, action) => {
      const { id, count, selectedAttributes } = action.payload;
      const newCartProducts = state.cartProducts.map((item) => {
        const isEqual = _.isEqual(item.selectedAttributes, selectedAttributes);
        if (item.product.id === id && isEqual) {
          return {
            ...item,
            quantity: item.quantity + count,
          };
        }
        return item;
      });

      return {
        ...state,
        cartProducts: newCartProducts,
        cartTotalQuantity: state.cartTotalQuantity + count,
      };
    },

    removeProduct: (state, action) => {
      const { id, selectedAttributes } = action.payload;
      const filteredProducts = state.cartProducts.filter((item) => {
        const isEqual = _.isEqual(item.selectedAttributes, selectedAttributes);
        if (item.product.id === id && isEqual) return;
        return item;
      });

      return {
        ...state,
        cartProducts: filteredProducts,
        cartTotalQuantity: state.cartTotalQuantity - 1,
      };
    },
  },

  /// GET DEFAULT CURRENCY VALUE
  extraReducers: (builder) => {
    builder.addCase(fetchDefaultCurrency.fulfilled, (state, action) => {
      return {
        ...state,
        selectedCurrency: action.payload,
      };
    });
  },
});

export const {
  changeCurrency,
  addProductToCart,
  changeProductQuantity,
  removeProduct,
} = storeSlice.actions;

export default storeSlice.reducer;
