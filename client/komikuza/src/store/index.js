import { configureStore } from "@reduxjs/toolkit";
import comicSlice from "./comicSlice";

export default configureStore({
  reducer: comicSlice,
});
