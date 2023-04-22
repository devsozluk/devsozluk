import supabase from "@/libs/supabase";
import {
  AddEntryData,
  CreateTopicData,
  IGetMoreEntries,
  UpdateVoteBody,
} from "@/types/index";
import getPagination from "@/utils/getPagination";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import slugify from "slugify";
import entriesFilter, {
  IFilterItem,
} from "@/components/Home/Filter/Filter.items";
import FilterItems from "@/components/Home/Filter/Filter.items";
import filterItems from "@/components/Home/Filter/Filter.items";

export const topicApi = createApi({
  reducerPath: "topicApi",
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getPopularTopics: builder.mutation({
      queryFn: async ({ page }: { page: number }): Promise<any> => {
        const { to, from } = getPagination(page, 20);
        const { data, error } = await supabase
          .from("topics")
          .select("*")
          .order("viewsCount", { ascending: false })
          .order("entryCount", { ascending: false })
          .range(from, to);

        if (error) {
          return { error };
        } else {
          return { data };
        }
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
            author: author as string,
          })
          .select("*")
          .single();

        if (error) return { error };

        const { data: entryData } = await supabase.from("entries").insert({
          author: author as string,
          topic: data?.id,
          content: body.content,
        });

        return { data: { topic: data, entry: entryData } };
      },
    }),
    addEntry: builder.mutation({
      queryFn: async (body: AddEntryData): Promise<any> => {
        const { content, topic, author } = body;

        const { data, error } = await supabase.from("entries").insert({
          author: author as string,
          topic: topic as number,
          content,
        });

        const { data: entries } = await supabase
          .from("entries")
          .select("*, author(*)")
          .order("created_at", { ascending: true })
          .eq("topic", topic);

        if (error) {
          return { error };
        } else {
          return { data: { entries } };
        }
      },
    }),
    entryVote: builder.mutation({
      queryFn: async (body: UpdateVoteBody): Promise<any> => {
        const { type, entry, author } = body;
        const upvoted = type === "up";
        const downvoted = type === "down";

        const { error, data } = await supabase
          .from("votes_entry")
          .upsert({
            entry,
            author,
            upvoted,
            downvoted,
          })
          .select("*")
          .single();

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    deleteEntryVote: builder.mutation({
      queryFn: async (body: UpdateVoteBody): Promise<any> => {
        const { entry, author } = body;

        const { error, data } = await supabase
          .from("votes_entry")
          .delete()
          .eq("author", author)
          .eq("entry", entry)
          .select("*")
          .single();

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    deleteEntry: builder.mutation({
      queryFn: async ({ id }: { id: number }): Promise<any> => {
        const { error, data } = await supabase
          .from("entries")
          .delete()
          .eq("id", id)
          .select("*")
          .single();

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    searchTopics: builder.mutation({
      queryFn: async (body: { text: string }): Promise<any> => {
        const { text } = body;

        const { data, error } = await supabase
          .from("topics")
          .select("*")
          .textSearch("title", text);

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    getUserTopics: builder.query({
      queryFn: async (userId: string): Promise<any> => {
        const { data, error } = await supabase
          .from("topics")
          .select("*")
          .eq("author", userId);

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    getUserEntries: builder.query({
      queryFn: async (userId: string): Promise<any> => {
        const { data, error } = await supabase
          .from("entries")
          .select("*, author(*), topic(slug, title, entryCount, viewsCount)")
          .order("created_at", { ascending: false })
          .eq("author", userId)
          .limit(10);

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
    getMoreEntries: builder.mutation({
      queryFn: async ({ page, filter }: IGetMoreEntries): Promise<any> => {
        const { to, from } = getPagination(page, 10);

        const selectedFilters = (
          filterItems.find((item) => item.name === filter) as IFilterItem
        )?.filters;

        const query = supabase
          .from("entries_views")
          .select(`*, author(username, avatar_url, name), topic(*)`);

        selectedFilters.forEach((filter) => {
          query.order(filter.order, filter.options);
        });

        const { data, error } = await query.range(from, to);

        if (error) {
          return { error };
        } else {
          return { data };
        }
      },
    }),
  }),
});

export const {
  useGetPopularTopicsMutation,
  useAddTopicMutation,
  useAddEntryMutation,
  useSearchTopicsMutation,
  useEntryVoteMutation,
  useDeleteEntryVoteMutation,
  useGetUserTopicsQuery,
  useGetUserEntriesQuery,
  useDeleteEntryMutation,
  useGetMoreEntriesMutation,
} = topicApi;
