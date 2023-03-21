import { IEntry, ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface ITopicState extends ITopic {
  entries: IEntry[];
}

const initialState = {
  topic: {} as ITopicState,
  topics: [] as any,
  entries: [] as IEntry[],
  isLoading: false,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default topicSlice.reducer;
export const {} = topicSlice.actions;
