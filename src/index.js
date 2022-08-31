import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import AuthReducer from "./redux/reducers/AuthReducer";
import Alerts from "./redux/reducers/AlertReducer";
import CartReducer from "./redux/reducers/CartReducer";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import storageSession from 'redux-persist/es/storage/session';
import storage from 'redux-persist/lib/storage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthReducer", "CartReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    AuthReducer,
    Alerts,
    CartReducer,
  })
);

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...[thunk]))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
