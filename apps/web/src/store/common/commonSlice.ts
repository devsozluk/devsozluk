import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  isDownloadApplication: boolean;
}

const initialState: CommonState = {
  isDownloadApplication: true
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setDownloadApplication(state, action: PayloadAction<boolean>) {
      state.isDownloadApplication = action.payload;
      localStorage.setItem("isDownloadApplication", action.payload.toString());
    },
  },
});

export const { setDownloadApplication } = commonSlice.actions;

export default commonSlice.reducer;
