import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { history, persistor, store } from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import { ReduxRouter } from "@lagunovsky/redux-react-router";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persistor}>
        <ReduxRouter history={history} store={store}>
          <App />
        </ReduxRouter>
      </PersistGate>
    </ApolloProvider>
  </Provider>
);
