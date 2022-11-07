import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../apollo/client";
import { FETCH_CATEGORY_NAMES, FETCH_CURRENCIES } from "../../apollo/queries";

const initialState = {
  categoryNames: null,
  currencies: null,
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
      });
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
