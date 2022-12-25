import altogic from "@/libs/altogic";
import { IUser, LoginFormData, RegisterFormData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk("auth/login", async (payload: { values: LoginFormData; formikActions: any }, { rejectWithValue }) => {
  const { user, session, errors } = await altogic.auth.signInWithEmail(payload.values.email, payload.values.password);
  payload.formikActions.setSubmitting(false);

  if (user) {
    return { user, session };
  } else {
    return payload.formikActions.setErrors({ responseMessage: getErrorTranslation(errors?.items[0].code) });
  }
});

export const authRegister = createAsyncThunk(
  "auth/register",
  async (payload: { values: RegisterFormData; formikActions: any }, { rejectWithValue }) => {
    const { user, session, errors } = await altogic.auth.signUpWithEmail(payload.values.email, payload.values.password, {
      name: payload.values.username,
      username: payload.values.username,
    } as IUser);

    if (user) {
      return { user, session };
    } else {
      return payload.formikActions.setErrors({ responseMessage: getErrorTranslation(errors?.items[0].code) });
    }
  }
);

export const authLogout = createAsyncThunk("auth/logout", async (payload, { rejectWithValue }) => {
  try {
    await altogic.auth.signOut();
    await altogic.auth.clearLocalData();
  } catch (err) {
    rejectWithValue("Error logging out");
  }
});
