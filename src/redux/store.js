import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import {
  createRouterMiddleware,
  createRouterReducer,
} from "@lagunovsky/redux-react-router";
import storage from "redux-persist/lib/storage";
import { createBrowserHistory } from "history";
import { storeSlice } from "./reducers/storeSlice";
import { dataSlice } from "./reducers/dataSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedStore = persistReducer(persistConfig, storeSlice.reducer);

export const history = createBrowserHistory();

export const routerMiddleware = createRouterMiddleware(history);

export const storeReducer = combineReducers({
  store: persistedStore,
  data: dataSlice.reducer,
  router: createRouterReducer(history),
});

export const store = configureStore({
  reducer: storeReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(routerMiddleware),
});

export let persistor = persistStore(store);

export default store;
