import { topicApi } from "@/services/topic";
import { IEntry, ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface ITopicState extends ITopic {
  entries: IEntry[];
}

const initialState = {
  topic: {} as ITopicState,
  topics: [] as any,
  entries: [] as IEntry[],
  isOpenTopicModal: false as boolean,
  isLoading: false,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopic(state, action) {
      state.topic = action.payload.topic;
      state.entries = action.payload.entries;
    },
    setTopicModal(state, action) {
      state.isOpenTopicModal = action.payload || !state.isOpenTopicModal;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      topicApi.endpoints.addEntry.matchFulfilled,
      (state, action) => {
        state.entries = action.payload.entries;
      }
    );
  },
});

export default topicSlice.reducer;
export const { setTopic, setTopicModal } = topicSlice.actions;
