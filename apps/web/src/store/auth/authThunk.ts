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
    payload.formikActions.setSubmitting(false);
    console.log(data);

    if (data) {
      return { data };
    } else {
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (
    payload: { values: RegisterFormData; formikActions: any },
    { rejectWithValue }
  ) => {
    const { email, password, name, username } = payload.values;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          user_name: username,
        },
      },
    });
    payload.formikActions.setSubmitting(false);

    if (data) {
      return { data };
    } else {
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
