import Entry from "@/components/Elements/Entry";
import StatusMessage from "@/components/Form/StatusMessage";
import TopicLoader from "@/components/Loading/topic";
import { getBySlugTopic } from "@/store/topic/topicThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import AddEntryForm from "./AddEntryForm";

const Topic: React.FC = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, topic } = useAppSelector((state) => state.topic);

  useEffect(() => {
    dispatch(getBySlugTopic({ slug })).then((result: any) => {
      if (result.error) navigate("/");
    });
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
    <div className="flex max-w-3xl flex-col gap-y-5 pb-10">
      {!topic.isPublic && <StatusMessage status="warning">Bu konu henüz onaylanmamış.</StatusMessage>}
      <div className="flex items-center justify-between">
        <Link to={"/konu/" + topic.slug} className="mb-1 text-lg font-bold text-primary">
          {topic.title}
        </Link>
        <div className="mt-2 flex gap-x-3 text-xs font-bold">
          <span className="flex items-center gap-x-1">
            <AiOutlineEye size={16} />
            {topic.viewCount}
          </span>
        </div>
      </div>
      {topic.entries?.map((entry, index) => (
        <Entry entry={entry} key={index} />
      ))}
      <AddEntryForm />
    </div>
  );
};

export default Topic;
