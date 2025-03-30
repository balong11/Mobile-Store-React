// redux, react-redux
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
