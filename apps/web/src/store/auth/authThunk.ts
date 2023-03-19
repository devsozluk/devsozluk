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
    const session = await supabase.auth.getSession();

    if (session) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(session.data.session?.access_token);

      if (error) {
        console.log(error.message);
      } else {
        return {
          session,
          user,
        };
      }
    }
  }
);
