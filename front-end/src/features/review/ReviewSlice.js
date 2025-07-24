import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// POST review
export const submitReview = createAsyncThunk(
  "reviews/submitReview",
  async (reviewData, thunkAPI) => {
    try {
      const res = await axios.post("/reviews", reviewData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to submit review");
    }
  }
);

// (Optional) GET reviews for a home
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (homeId, thunkAPI) => {
    try {
      const res = await axios.get(`/homes/${homeId}/reviews`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to load reviews");
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload); // optimistic update
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;