import supabase from "@/libs/supabase";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuidv4 } from "uuid";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserLinks: builder.query({
      queryFn: async (): Promise<any> => {
        const { data: user } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("profiles")
          .select("links")
          .eq("id", user.user?.id)
          .single();

        console.log(data);

        if (error) {
          return { error };
        } else {
          return { data: data.links };
        }
      },
    }),
    updateUserLinks: builder.mutation({
      queryFn: async ({ links }: { links: any }): Promise<any> => {
        const { data: user } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("profiles")
          .update({ links: links as any })
          .eq("id", user.user?.id)
          .select("*");

        if (error) {
          return { error };
        } else {
          return { data: data };
        }
      },
    }),
    getUserVotes: builder.mutation({
      queryFn: async ({ id }: { id: string }): Promise<any> => {
        const { data, error } = await supabase
          .from("votes_entry")
          .select("*")
          .eq("author", id);

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

export const {
  useUpdatePhotoMutation,
  useGetUserVotesMutation,
  useGetUserLinksQuery,
  useUpdateUserLinksMutation,
} = userApi;
