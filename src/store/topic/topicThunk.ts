import { createAsyncThunk } from "@reduxjs/toolkit";
import altogic from "@/libs/altogic";
import { toast } from "react-toastify";

export const getBySlugTopic = createAsyncThunk("topic/getBySlug", async (payload: { slug: string }, { rejectWithValue }) => {
  const endpoint = `/topics/bySlug?slug=${payload.slug}`;

  const { data: topicData, errors } = await altogic.endpoint.get(endpoint);

  if (!topicData) {
    toast.warning("Aradığınız konu yok veya silinmiş.");
    return rejectWithValue("Error getting topic");
  }

  return topicData;
});

export const getPopularTopics = createAsyncThunk("topic/getPopular", async () => {
  const endpoint = "/topics?sort=viewCount:desc";

  const { data: topicData } = await altogic.endpoint.get(endpoint);

  return topicData;
});
