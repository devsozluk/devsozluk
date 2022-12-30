import { ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getBySlugTopic, getPopularTopics } from "./topicThunk";

const initialState = {
   topic: {} as ITopic,
   topics: [] as ITopic[],
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
      builder.addCase(getPopularTopics.pending, (state, action) => {
         state.isLoading = true;
      })
      builder.addCase(getPopularTopics.fulfilled, (state, action) => {
         state.topics = action.payload.result;
         state.isLoading = false;
      })
   }
});

export default topicSlice.reducer;
