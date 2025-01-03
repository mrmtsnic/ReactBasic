import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import Cart from "./components/Cart";
import UseReducer from "./components/UseReducer";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/* <App />
    <Counter />
    <Cart /> */}
    {/* <Todo />
     */}
    <UseReducer />
  </StrictMode>
);
