import altogic from "@/libs/altogic";
import { CreateTopicData } from "@/types";
import { APIError } from "altogic";
import slugify from "slugify";
import EntryService from "@/services/entry";
import type { ITopic } from "@/types";

export const CreateTopic = async (userId: string, data: CreateTopicData): Promise<{ errors?: any; data?: any }> => {
  const { data: topicData, errors } = (await altogic.db.model("topics").create({ title: data.title, author: userId, slug: slugify(data.title) })) as {
    data: ITopic;
    errors: APIError;
  };
  if (errors) return { errors };

  const { data: entryData, errors: entryErrors } = await EntryService.CreateEntry(userId, {
    content: data.content,
    topic: topicData._id,
  });

  if (entryErrors) return { errors: entryErrors };

  return { data: topicData };
};

export default {
  CreateTopic,
};
