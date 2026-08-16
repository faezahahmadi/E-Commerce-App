import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import wishlistReducer from "./WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
