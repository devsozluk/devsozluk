import altogic from "@/libs/altogic";
import { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "altogic";
import { authLogin, authLogout, authRegister, getAuthGrant } from "./authThunk";

interface AuthState {
  user: IUser | null;
  session: Session | null;
  isLoggedIn: boolean;
}

const user = altogic.auth.getUser();

const initialState: AuthState = {
  user,
  isLoggedIn: !!user,
  session: altogic.auth.getSession(),
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
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoggedIn = !!action.payload.user;
      state.user = action.payload.user;
      state.session = action.payload.session;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.isLoggedIn = !!action.payload.session;
      state.user = action.payload.user;
    });
    builder.addCase(authLogout.pending, (state, action) => {
      state.user = null;
      state.session = null;
      state.isLoggedIn = false;
    });
    builder.addCase(getAuthGrant.fulfilled, (state, action) => {
      state.isLoggedIn = !!action.payload.user;
      state.user = action.payload.user;
      state.session = action.payload.session;
    });
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
