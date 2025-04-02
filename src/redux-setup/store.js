// redux, react-redux
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "vietpro",
  storage,
}
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
});
export const persistor = persistStore(store);
export default store;
