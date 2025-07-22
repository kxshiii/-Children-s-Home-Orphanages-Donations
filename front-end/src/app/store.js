import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import homesReducer from '../features/homes/homesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import donationsReducer from '../features/donations/donationSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    homes: homesReducer,
    reviews: reviewsReducer,
    donations: donationsReducer,
    admin: adminReducer,
  },
});
