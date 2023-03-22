import { CreateTopicData } from "./../types/index";
import supabase from "@/libs/supabase";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import slugify from "slugify";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getLatestTopics: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase
          .from("topics")
          .select("*")
          .order("created_at", { ascending: false });

        return { data };
      },
    }),
    addTopic: builder.mutation({
      queryFn: async (body: CreateTopicData): Promise<any> => {
        const { title, userId } = body;

        const slug = slugify(title);
        const { error, data } = await supabase
          .from("topics")
          .insert({
            title,
            author: userId as string,
            slug,
          })
          .select("*")
          .single();

        const { data: entryData } = await supabase.from("entries").insert({
          author: userId as string,
          topic: data?.id,
          content: body.content,
        });

        if (error) {
          return { error };
        } else {
          return { data: { topic: data, entry: entryData } };
        }
      },
    }),
  }),
});

export const { useGetLatestTopicsQuery, useAddTopicMutation } = topicApi;
