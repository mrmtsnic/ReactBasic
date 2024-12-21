import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
import Counter from "./components/Counter";
import Todo from "./components/Todo";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
    <Counter />
    <Todo />
  </StrictMode>
);
