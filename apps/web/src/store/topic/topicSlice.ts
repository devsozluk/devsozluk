import { topicApi } from "@/services/topic";
import { IEntry, ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      topicApi.endpoints.addEntry.matchFulfilled,
      (state, action) => {
        state.entries = action.payload.entries;
      }
    );
    builder.addMatcher(
      topicApi.endpoints.getUserEntries.matchFulfilled,
      (state, action) => {
        state.entries = action.payload;
      }
    );
    builder.addMatcher(
      topicApi.endpoints.deleteEntry.matchFulfilled,
      (state, action) => {
        toast.success("Yanıtınız başarıyla silindi.");
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload.id
        );
      }
    );
    builder.addMatcher(
      topicApi.endpoints.getMoreEntries.matchFulfilled,
      (state, action) => {
        state.entries = [...state.entries, ...action.payload];
      }
    );
  },
});

export default topicSlice.reducer;
export const { setTopic, setTopicModal } = topicSlice.actions;
