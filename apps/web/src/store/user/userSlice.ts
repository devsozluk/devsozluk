import { authApi } from "@/services/auth";
import { topicApi } from "@/services/topic";
import { userApi } from "@/services/user";
import { createSlice } from "@reduxjs/toolkit";
import { IVote } from "./../../types/index";

interface UserState {
  votes: IVote[];
}

const initialState: UserState = {
  votes: [],
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      userApi.endpoints.getUserVotes.matchFulfilled,
      (state, action) => {
        state.votes = action.payload;
      }
    );
    builder.addMatcher(
      topicApi.endpoints.entryVote.matchFulfilled,
      (state, action) => {
        state.votes.push(action.payload);
      }
    );
    builder.addMatcher(
      topicApi.endpoints.deleteEntryVote.matchFulfilled,
      (state, action) => {
        state.votes = state.votes.filter(
          (vote) => vote.entry !== action.payload.entry
        );
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.votes = [];
      }
    );
  },
});

export default userSlice.reducer;
export const {} = userSlice.actions;
