import { createSlice } from "@reduxjs/toolkit";

export const comicSlice = createSlice({
  name: "comic",
  initialState: {
    value: 0,
    comics: [],
    detailscomic: [],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    fetchSuccess: (state, action) => {
      state.comics = action.payload;
    },
    fetchDetailSuccess: (state, action) => {
      state.detailscomic = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increment,
  decrement,
  incrementByAmount,
  fetchSuccess,
  fetchDetailSuccess,
} = comicSlice.actions;

export default comicSlice.reducer;
