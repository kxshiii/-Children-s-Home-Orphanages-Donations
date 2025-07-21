import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import homeReducer from "./features/homes/homeSlice";
import reviewReducer from "./features/reviews/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    homes: homeReducer,
    reviews: reviewReducer,
  },
});

export default store;
