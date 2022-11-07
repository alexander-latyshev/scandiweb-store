import { FETCH_CURRENCIES } from "../../apollo/queries";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../apollo/client";

const initialState = {
  selectedCurrency: null,
};

export const fetchDefaultCurrency = createAsyncThunk(
  "store/fetchDefaultCurrency",
  async () => {
    const response = await client.query({
      query: FETCH_CURRENCIES,
    });
    return response.data.currencies[0].label;
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

export const { changeCurrency } = storeSlice.actions;

export default storeSlice.reducer;
