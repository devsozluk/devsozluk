import altogic from "@/libs/altogic";
import { CreateTopicData, ITopic } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIError } from "altogic";
import { toast } from "react-toastify";
import slugify from "slugify";
import { RootState } from "..";

export const getBySlugTopic = createAsyncThunk("topic/getBySlug", async (payload: { slug: string }, { rejectWithValue }) => {
  const endpoint = `/topics/bySlug?slug=${payload.slug}`;

  const { data: topicData, errors } = await altogic.endpoint.get(endpoint);

  if (!topicData) {
    toast.warning("Aradığınız konu yok veya silinmiş.");
    return rejectWithValue("Error getting topic");
  }

  return topicData;
});

export const getPopularTopics = createAsyncThunk("topic/getLatest", async () => {
  const endpoint = "/topics?sort=createdAt:desc";

  const { data: topicData, errors } = await altogic.endpoint.get(endpoint);

  return topicData;
});

export const getLatestEntries = createAsyncThunk("topic/getLatestEntries", async () => {
  const endpoint = "/entry?sort=createdAt:desc";

  const { data: entriesData } = await altogic.endpoint.get(endpoint);

  return entriesData;
});

export const createTopic = createAsyncThunk("topic/createTopic", async (payload: { values: CreateTopicData; formikActions: any }, thunkAPI) => {
  const { auth } = thunkAPI.getState() as RootState;
  const { data: topic, errors } = (await altogic.db.model("topics").create({
    ...payload.values,
    slug: slugify(payload.values.title),
    author: auth.user?._id,
  })) as { data: ITopic; errors: APIError | null };

  if (topic) {
    const entry = await thunkAPI.dispatch(createEntry({ ...payload.values, topic: topic._id, author: auth.user?._id }));
    toast.success("konu oluşturuldu yönlendiriliyorsunuz...");
    return { topic };
  } else {
    payload.formikActions.setErrors({ responseMessage: getErrorTranslation(errors) });
    thunkAPI.rejectWithValue("Error creating topic");
  }
});

const createEntry = createAsyncThunk("topic/createEntry", async (payload: any) => {
  const { data: entryData, errors } = await altogic.endpoint.post("/entry", payload);
  if (errors) return { errors };

  return entryData;
});
