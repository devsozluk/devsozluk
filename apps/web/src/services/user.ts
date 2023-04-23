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
    updateProfile: builder.mutation({
      queryFn: async ({
        biography,
        position,
        userId,
      }: {
        biography: string;
        position: string;
        userId: string;
      }): Promise<any> => {
        const { data, error } = await supabase
          .from("profiles")
          .update({ biography, position })
          .eq("id", userId)
          .select("*")
          .single();

        if (error) {
          return { error };
        } else {
          return { data };
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
    updateUserProfile: builder.mutation({
      queryFn: async ({
        username,
        name,
        userId,
      }: {
        username: string;
        name: string;
        userId: string;
      }): Promise<any> => {
        const { data: profile, error } = await supabase
          .from("profiles")
          .update({
            username,
            name,
          })
          .eq("id", userId)
          .select("*")
          .single();

        const { data: user, error: userError } = await supabase.auth.updateUser(
          {
            data: { user_name: username, name },
          }
        );

        if (error) {
          return { error };
        } else {
          return { data: { profile, user: user.user } };
        }
      },
    }),
    searchProfile: builder.mutation({
      queryFn: async (body: { text: string }): Promise<any> => {
        const { text } = body;

        const { data, error } = await supabase
          .from("profiles")
          .select("username, name, avatar_url")
          .textSearch("name", text)
          .textSearch("usernamae", text);

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
  useUpdateUserProfileMutation,
  useUpdateProfileMutation,
  useSearchProfileMutation,
} = userApi;
