import altogic from "@/libs/altogic";
import { IUser, LoginFormData, RegisterFormData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (
    payload: { values: LoginFormData; formikActions: any },
    { rejectWithValue }
  ) => {
    const { user, session, errors } = await altogic.auth.signInWithEmail(
      payload.values.email,
      payload.values.password
    );
    payload.formikActions.setSubmitting(false);

    if (user) {
      return { user, session };
    } else {
      return payload.formikActions.setErrors({
        responseMessage: getErrorTranslation(errors?.items[0].code),
      });
    }
  }
);

export const getAuthGrant = createAsyncThunk(
  "auth/getGrant",
  async (payload, { rejectWithValue }): Promise<any> => {
    const params = new URLSearchParams(window.location.search);

    const error = params.get("error");
    const action = params.get("action");

    if (error) {
      toast.error(getErrorTranslation("already_oauth2_email"));
      return rejectWithValue("Error getting auth grant");
    }

    const { user, session, errors } = await altogic.auth.getAuthGrant();

    if (user) {
      if (action === "email-confirm")
        toast.success("Mail adresiniz doğrulandı.");
      return { user, session };
    } else {
      toast.error(getErrorTranslation(errors?.items[0].code));
      return rejectWithValue("Error getting auth grant");
    }
  }
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (
    payload: { values: RegisterFormData; formikActions: any },
    { rejectWithValue }
  ) => {
    const { user, errors } = (await altogic.auth.signUpWithEmail(
      payload.values.email,
      payload.values.password,
      {
        name: payload.values.name,
        username: payload.values.username,
      } as IUser
    )) as any;

    if (user) {
      return { user };
    } else {
      if (
        errors?.items[0].code === "not_unique" &&
        errors?.items[0].details?.field === "username"
      )
        return payload.formikActions.setErrors({
          username: getErrorTranslation(
            errors?.items[0].code,
            errors?.items[0].details?.field
          ),
        });

      payload.formikActions.setErrors({
        responseMessage: getErrorTranslation(
          errors?.items[0].code,
          errors?.items[0].details?.field
        ),
      });
      return rejectWithValue("Error registering");
    }
  }
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      await altogic.auth.signOut();
      await altogic.auth.clearLocalData();
    } catch (err) {
      rejectWithValue("Error logging out");
    }
  }
);
