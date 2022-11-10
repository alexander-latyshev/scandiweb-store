import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../apollo/client";
import {
  FETCH_CATEGORY,
  FETCH_CATEGORY_NAMES,
  FETCH_CURRENCIES,
  FETCH_PRODUCT,
} from "../../apollo/queries";

const initialState = {
  categoryNames: null,
  currencies: null,
  products: null,
  currentProduct: null,
};

export const fetchCategoryNames = createAsyncThunk(
  "store/fetchCategoryNames",
  async () => {
    const response = await client.query({
      query: FETCH_CATEGORY_NAMES,
    });
    return response.data;
  }
);

export const fetchCurrencies = createAsyncThunk(
  "store/fetchCurrencies",
  async () => {
    const response = await client.query({
      query: FETCH_CURRENCIES,
    });
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  "store/fetchProducts",
  async (categoryName) => {
    const response = await client.query({
      query: FETCH_CATEGORY,
      variables: {
        categoryName: categoryName,
      },
    });
    return response.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "store/fetchProduct",
  async (productID) => {
    const response = await client.query({
      query: FETCH_PRODUCT,
      variables: {
        productID: productID,
      },
    });
    return response.data.product;
  }
);

export const dataSlice = createSlice({
  name: "store/fetchData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryNames.fulfilled, (state, action) => {
        return {
          ...state,
          categoryNames: action.payload.categories,
        };
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        return {
          ...state,
          currencies: action.payload.currencies,
        };
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload.category.products,
        };
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        return {
          ...state,
          currentProduct: action.payload,
        };
      });
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
