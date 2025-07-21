import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api"; // adjust path if needed

// GET all homes
export const fetchHomes = createAsyncThunk(
  "homes/fetchHomes",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/homes");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to load homes");
    }
  }
);

const homeSlice = createSlice({
  name: "homes",
  initialState: {
    list: [],
    loading: false,
    error: null,
    searchTerm: "",
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchHomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm } = homeSlice.actions;
export default homeSlice.reducer;
