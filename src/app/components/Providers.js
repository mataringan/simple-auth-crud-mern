"use client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../store";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
