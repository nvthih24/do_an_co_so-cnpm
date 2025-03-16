import React from "react";
import ReactDOM from "react-dom/client"; // Sử dụng react-dom/client cho React 18
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducers/rootReducer";
import App from "./views/App";

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById("root")); // Tạo root từ React 18

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
