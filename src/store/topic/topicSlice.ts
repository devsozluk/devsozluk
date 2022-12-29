import { ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getBySlugTopic } from "./topicThunk";

const initialState = {
   topic: {} as ITopic,
   isLoading: false,
   error: null as unknown,
};

const topicSlice = createSlice({
   name: "topic",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getBySlugTopic.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getBySlugTopic.fulfilled, (state, action) => {
         state.isLoading = false;
         state.topic = action.payload;
      });
      builder.addCase(getBySlugTopic.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      });
   }
});

export default topicSlice.reducer;
