//store.js
import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Cart/cart.reducer";
import UserReducer from "./User/user.reducer";
export const store = configureStore({
  reducer: {
    Cart: CartReducer,
    User: UserReducer,
  },
});
