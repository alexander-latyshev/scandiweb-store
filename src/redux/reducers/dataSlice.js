import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../../apollo/client";
import { GET_CATEGORY_NAMES } from "../../apollo/queries";

const initialState = {
  categoryNames: null,
};

export const fetchCategoryNames = createAsyncThunk(
  "store/fetchCategoryNames",
  async () => {
    const response = await client.query({
      query: GET_CATEGORY_NAMES,
    });
    return response.data;
  }
);

export const dataSlice = createSlice({
  name: "store/fetchData",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryNames.fulfilled, (state, action) => {
      return {
        ...state,
        categoryNames: action.payload.categories,
      };
    });
  },
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
