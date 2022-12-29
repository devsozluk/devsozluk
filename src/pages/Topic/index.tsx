import Entry from "@/components/Elements/Entry";
import altogic from "@/libs/altogic";
import type { IEntry, ITopic } from "@/types";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import TopicLoader from "@/components/Loading/topic";
import AddEntryForm from "./AddEntryForm";
import { toast } from "react-toastify";

const Topic: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [topic, setTopic] = useState<ITopic>({} as ITopic);
  const [entries, setEntries] = useState<IEntry[] | null>(null);

  useEffect(() => {
    const getBySlugTopic = async () => {
      setIsLoading(true);
      const { data: topicData, errors } = await altogic.endpoint.get(`/topics/bySlug?slug=${slug}`);
      if (!topicData) {
        toast.warning("Aradığınız konu yok veya silinmiş.");
        return navigate("/");
      }
      const { data: entriesData } = await altogic.endpoint.get(`/entry?filter=this.topic._id == '${topicData._id}'`);
      setTopic(topicData);
      setEntries(entriesData.result);
      setIsLoading(false);
    };
    getBySlugTopic();
  }, [, location]);

  // const handleAddEntry = async ({ content }: any, { setSubmitting }: any) => {
  //   // setIsLoading(true);
  //   // await EntryService.CreateEntry(user?._id as string, { content, topic: topic._id });
  //   // const { data } = (await EntryService.FetchEntries(topic._id)) as { data: IEntry[] };
  //   // setEntries(data);
  //   // setIsLoading(false);
  // };

  if (isLoading) return <TopicLoader />;

  return (
    <div className="flex flex-col max-w-3xl gap-y-5 pb-10">
      <div className="flex justify-between items-center">
        <Link to={"/konu/" + topic.slug} className="text-primary font-bold text-lg mb-1">
          {topic.title}
        </Link>
        <div className="flex gap-x-3 text-xs font-bold mt-2">
          <span className="flex items-center gap-x-1">
            <AiOutlineEye size={16} />
            {topic.viewCount}
          </span>
        </div>
      </div>
      {entries?.map((entry, index) => (
        <Entry entry={entry} key={index} />
      ))}
      <AddEntryForm />
    </div>
  );
};

export default Topic;
