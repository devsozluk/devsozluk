import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister, checkSession } from "./authThunk";
import type { User, Session } from "@supabase/supabase-js";
import supabase from "@/libs/supabase";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  isLoggedIn: !!null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isLoggedIn = !!action.payload.user;
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkSession.fulfilled, (state, action) => {
      if (!action?.payload?.session) return;
      state.user = action.payload!.user;
      state.session = action.payload!.session.data.session;
      state.isLoggedIn = true;
    });
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
