import { IEntry, ITopic } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface ITopicState extends ITopic {
  entries: IEntry[];
}

const initialState = {
  topic: {} as ITopicState,
  topics: [] as ITopic[],
  entries: [] as IEntry[],
  isLoading: false,
  isOpenTopicModal: false,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    toggleTopicModal(state) {
      state.isOpenTopicModal = !state.isOpenTopicModal;
    },
  },
});

export default topicSlice.reducer;
export const { toggleTopicModal } = topicSlice.actions;
