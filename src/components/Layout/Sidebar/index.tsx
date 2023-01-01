import TopicLoader from "@/components/Loading/sidebar";
import { getPopularTopics } from "@/store/topic/topicThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, topics } = useAppSelector((state) => state.topic);

  useEffect(() => {
    dispatch(getPopularTopics());
  }, []);

  return (
    <div className="fixed ml-8 hidden h-screen w-[250px] flex-col space-y-3 overflow-y-auto rounded px-5 scrollbar scrollbar-track-slate-700  scrollbar-thumb-primary  scrollbar-thumb-rounded scrollbar-w-2 hover:scrollbar-thumb-buttonPrimary md:flex lg:w-[300px]">
      {isLoading ? (
        <TopicLoader />
      ) : (
        topics?.map((topic, index) => (
          <Link
            key={index}
            className="flex items-center justify-between break-words rounded px-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white"
            to={"/konu/" + topic.slug}
          >
            {topic.title}
            <span className="ml-5 text-sm">{topic?.entryCount}</span>
          </Link>
        ))
      )}
    </div>
  );
};

export default Sidebar;
