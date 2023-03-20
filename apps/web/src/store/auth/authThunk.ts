import Toast from "react-hot-toast";
import getErrorTranslation from "@/utils/errors";
import supabase from "@/libs/supabase";
import { LoginFormData, RegisterFormData } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (
    payload: { values: LoginFormData; formikActions: any },
    { rejectWithValue }
  ) => {
    const { email, password } = payload.values;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (data.user) {
      return data;
    } else {
      Toast.error(getErrorTranslation(error?.message));
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (payload: { values: RegisterFormData; formikActions: any }) => {
    const { email, password, name, username } = payload.values;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_name: username,
          avatar_url: `https://avatars.dicebear.com/api/big-ears-neutral/default.svg`,
        },
      },
    });

    if (data.user) {
      return data;
    } else {
      Toast.error(getErrorTranslation(error?.message));
    }
  }
);

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (payload, { rejectWithValue }) => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(data.session?.access_token);

      if (error) {
        console.log(error.message);
      } else {
        return {
          session: data.session,
          user,
        };
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    const response = await supabase.auth.signOut();
    return response;
  }
);
