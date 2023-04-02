import supabase from "@/libs/supabase";
import { v4 as uuidv4 } from "uuid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserVotes: builder.mutation({
      queryFn: async (): Promise<any> => {
        const { data: user } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("votes_entry")
          .select("*")
          .eq("author", user.user?.id);

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    updatePhoto: builder.mutation({
      queryFn: async ({ avatarFile }: { avatarFile: File }): Promise<any> => {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`public/${uuidv4()}`, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          return { error };
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(data.path);

        const { data: user } = await supabase.auth.updateUser({
          data: { avatar_url: publicUrl },
        });

        await supabase
          .from("profiles")
          .update({
            avatar_url: publicUrl,
          })
          .eq("id", user.user?.id);

        return { data: { user } };
      },
    }),
  }),
});

export const { useUpdatePhotoMutation, useGetUserVotesMutation } = userApi;
