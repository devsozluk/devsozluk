import { AddEntryData, CreateTopicData } from "@/types/index";
import supabase from "@/libs/supabase";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import slugify from "slugify";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getLatestTopics: builder.mutation({
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
        const { title, author } = body;

        const slug = slugify(title, { lower: true });
        const { error, data } = await supabase
          .from("topics")
          .insert({
            title,
            slug,
            author,
          })
          .select("*")
          .single();

        const { data: entryData } = await supabase.from("entries").insert({
          author,
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
    addEntry: builder.mutation({
      queryFn: async (body: AddEntryData): Promise<any> => {
        const { content, topic, author } = body;

        const { data, error } = await supabase.from("entries").insert({
          author,
          topic,
          content,
        });

        const { data: entries } = await supabase
          .from("entries")
          .select("*, author(*)")
          .eq("topic", topic);

        if (error) {
          return { error };
        } else {
          return { data: { entries } };
        }
      },
    }),
  }),
});

export const {
  useGetLatestTopicsMutation,
  useAddTopicMutation,
  useAddEntryMutation,
} = topicApi;
