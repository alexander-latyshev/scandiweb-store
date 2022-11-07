import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  createRouterMiddleware,
  createRouterReducer,
} from "@lagunovsky/redux-react-router";
import { createBrowserHistory } from "history";
import { storeSlice } from "./reducers/storeSlice";
import { dataSlice } from "./reducers/dataSlice";

export const history = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(history);

export const storeReducer = combineReducers({
  store: storeSlice.reducer,
  data: dataSlice.reducer,
  router: createRouterReducer(history),
});

export const store = configureStore({
  reducer: storeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(routerMiddleware),
});

export default store;
