import supabase from "@/libs/supabase";
import { LoginFormData, RegisterFormData } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserMe: builder.mutation({
      queryFn: async (): Promise<any> => {
        const { data } = await supabase.auth.getSession();

        if (data.session) {
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser(data.session?.access_token);

          if (error) {
            return { error };
          } else {
            return {
              data: { session: data.session, user },
            };
          }
        } else return { error: { message: "No session" } };
      },
    }),
    authLogin: builder.mutation({
      queryFn: async (body: LoginFormData): Promise<any> => {
        const { email, password } = body;
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          return { error };
        }

        return { data };
      },
    }),
    logout: builder.mutation({
      queryFn: async (): Promise<any> => {
        const { error } = await supabase.auth.signOut();

        if (error) {
          return { error };
        }

        return true;
      },
    }),
    authRegister: builder.mutation({
      queryFn: async (body: RegisterFormData): Promise<any> => {
        const { email, password, name, username } = body;
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              user_name: username,
              avatar_url: `https://api.dicebear.com/5.x/big-ears-neutral/svg?seed=${username}`,
            },
          },
        });

        if (data.user) {
          return { data };
        } else {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useAuthLoginMutation,
  useAuthRegisterMutation,
  useGetUserMeMutation,
  useLogoutMutation,
} = authApi;
