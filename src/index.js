import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "./contexts/currentUser";
import "./interceptor";
import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./redux/reducers/root-reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <CurrentUserProvider>
      <Router>
        <App />
      </Router>
    </CurrentUserProvider>
  </Provider>,
  document.getElementById("root")
);
