import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { store, persistor } from "store";
 import "./index.css";
// import "./index.scss"
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import './helper/fontAwesome'

import Main from "routes";

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
