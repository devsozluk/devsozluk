import { createAsyncThunk } from "@reduxjs/toolkit";

export const createEntry = createAsyncThunk("entry/createEntry", async (payload: { values: any; formikActions: any }, { rejectWithValue }) => {
  //   const { data: entryData, errors } = await altogic.endpoint.post("/entry", { ...payload.values, author: userId });
  //   if (errors) return { errors };
  //   return { test: "asd" };
});
