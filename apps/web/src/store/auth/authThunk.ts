import altogic from "@/libs/altogic";
import { IUser, LoginFormData, RegisterFormData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIError } from "altogic";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RootState } from "..";

export const authLogin = createAsyncThunk("auth/login", async (payload: { values: LoginFormData; formikActions: any }) => {
  const { user, session, errors } = await altogic.auth.signInWithEmail(payload.values.email, payload.values.password);
  payload.formikActions.setSubmitting(false);

  if (user) {
    return { user, session };
  } else {
    return payload.formikActions.setErrors({ responseMessage: getErrorTranslation(errors?.items[0].code) });
  }
});

export const getAuthGrant = createAsyncThunk("auth/getGrant", async (payload, thunkAPI): Promise<any> => {
  const params = new URLSearchParams(window.location.search);

  const error = params.get("error");
  const action = params.get("action");
  const code = params.get("code");

  if (error) {
    toast.error(getErrorTranslation(code as string));
    return thunkAPI.rejectWithValue("Error getting auth grant");
  }

  const { user, session, errors } = (await altogic.auth.getAuthGrant()) as any;

  if (user) {
    if (action === "email-confirm") toast.success("Mail adresiniz doğrulandı.");

    if (action === "oauth-signup") {
      const username = slugify(user.name as string, { lower: true, strict: true });
      await thunkAPI.dispatch(updateProfile({ userId: user._id, data: { username } }));
      user.username = username;
      toast.success("Hesabınız oluşturuldu.");
    }

    return { user, session };
  } else {
    toast.error(getErrorTranslation(errors?.items[0].code));
    return thunkAPI.rejectWithValue("Error getting auth grant");
  }
});

export const authRegister = createAsyncThunk(
  "auth/register",
  async (payload: { values: RegisterFormData; formikActions: any }, { rejectWithValue }) => {
    const { user, errors } = (await altogic.auth.signUpWithEmail(payload.values.email, payload.values.password, {
      name: payload.values.name,
      username: payload.values.username,
    } as IUser)) as any;

    if (user) {
      return { user };
    } else {
      if (errors?.items[0].code === "not_unique" && errors?.items[0].details?.field === "username")
        return payload.formikActions.setErrors({ username: getErrorTranslation(errors?.items[0].code, errors?.items[0].details?.field) });

      payload.formikActions.setErrors({ responseMessage: getErrorTranslation(errors?.items[0].code, errors?.items[0].details?.field) });
      return rejectWithValue("Error registering");
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

export const userChangePhoto = createAsyncThunk("auth/userChangePhoto", async (payload: File, thunkAPI) => {
  const { data, errors } = (await altogic.storage.root.upload(payload.name, payload, {
    isPublic: true,
    onProgress() {},
  })) as { data: { publicPath: string }; errors: APIError };

  if (errors) {
    return thunkAPI.rejectWithValue("Error uploading file");
  }
  await thunkAPI.dispatch(updateProfile({ data: { profilePicture: data.publicPath } }));

  return toast.success("Profil fotoğrafınız güncellendi.");
});

export const updateProfile = createAsyncThunk("auth/updateProfile", async (payload: { userId?: string; data: Partial<IUser> }, { getState }) => {
  const { auth } = getState() as RootState;
  const userId = payload.userId || auth.user?._id;

  const { data: user, errors } = await altogic.db.model("users").object(userId).update(payload.data);
  if (errors) throw errors;

  return user as IUser;
});
