import { getPopularTopics } from "@/store/topic/topicThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import Link from "next/link";
import React, { useEffect } from "react";
import TopicLoader from "./Sidebar.loader";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, topics } = useAppSelector((state) => state.topic);

  useEffect(() => {
    dispatch(getPopularTopics());
  }, [dispatch]);

  return (
    <div className="fixed ml-8 hidden h-screen w-[250px] flex-col space-y-3 overflow-y-auto rounded px-5 scrollbar scrollbar-track-slate-700  scrollbar-thumb-primary  scrollbar-thumb-rounded scrollbar-w-2 hover:scrollbar-thumb-buttonPrimary md:flex lg:w-[300px]">
      {isLoading ? (
        <TopicLoader />
      ) : (
        topics?.map((topic, index) => (
          <Link
            key={index}
            className="flex items-center justify-between break-words rounded px-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
            href={"/konu/" + topic.slug}
          >
            <p className="truncate">{topic.title}</p>
            <span className="ml-5 text-sm">{topic?.entryCount}</span>
          </Link>
        ))
      )}
    </div>
  );
};

export default Sidebar;
