import TopicLoader from "@/components/Loading/sidebar";
import altogic from "@/libs/altogic";
import { ITopic } from "@/types";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [topics, setTopics] = useState<ITopic[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>();
  const location = useLocation();

  useEffect(() => {
    const getPopularTopics = async () => {
      setIsLoading(true);
      const { data, errors } = await altogic.endpoint.get("/topics?sort=viewCount:desc");
      setTopics(data.result);
      setIsLoading(false);
    };
    getPopularTopics();
  }, [, location]);

  return (
    <div className="hidden md:flex flex-col w-[250px] px-5 lg:w-[300px] space-y-3 ml-8 scrollbar scrollbar-w-2 scrollbar-thumb-primary scrollbar-track-slate-700  scrollbar-thumb-rounded  fixed h-screen overflow-y-auto hover:scrollbar-thumb-buttonPrimary rounded">
      {isLoading ? (
        <div className="space-y-5">
          <TopicLoader />
          <TopicLoader />
          <TopicLoader />
        </div>
      ) : (
        topics?.map((topic, index) => (
          <Link
            key={index}
            className="text-base px-2 py-1 break-words hover:bg-buttonPrimary hover:text-white transition-all rounded flex justify-between items-center"
            to={"/konu/" + topic.slug}
          >
            {topic.title}
            <span className="text-sm ml-5">{topic?.entryCount}</span>
          </Link>
        ))
      )}
    </div>
  );
};

export default Sidebar;
