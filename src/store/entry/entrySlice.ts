import { createSlice } from "@reduxjs/toolkit";
import { createEntry } from "./entryThunk";

const initialState = {
  isLoading: false,
};

const topicSlice = createSlice({
  name: "entry",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEntry.fulfilled, (state, action) => {});
  },
});

export default topicSlice.reducer;
