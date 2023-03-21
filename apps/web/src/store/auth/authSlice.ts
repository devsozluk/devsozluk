import { authApi } from "@/services/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoading: false,
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
    builder.addMatcher(
      authApi.endpoints.getUserMe.matchFulfilled,
      (state, action) => {
        if (!action.payload.user) return;
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.authRegister.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.authLogin.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.session = action.payload.session;
        state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.user = null;
        state.session = null;
        state.isLoggedIn = false;
      }
    );
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
