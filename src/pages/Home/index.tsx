import Entry from "@/components/Elements/Entry";
import TopicCard from "@/components/Elements/TopicCard";
import altogic from "@/libs/altogic";
import type { IEntry } from "@/types";
import { removeUnique } from "@/utils";
import { useAppDispatch } from "@/utils/hooks";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  const [entries, setEntries] = useState<IEntry[] | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getLatestTopics = async () => {
      const { data, errors } = await altogic.endpoint.get("/entry?sort=createdAt:desc");
      setEntries(removeUnique(data.result, "topic"));
    };
    getLatestTopics();
  }, []);

  return (
    <div className="flex justify-evenly">
      <div className="flex w-full max-w-3xl flex-col  gap-y-10 divide-y-[1px] divide-tertiary divide-opacity-50 pb-10">
        {entries?.map((entry, index) => (
          <div key={index} className="flex w-full flex-col gap-y-5 pt-3">
            <div className="flex items-center justify-between">
              <Link to={"/konu/" + entry.topic.slug} className="mb-1 text-lg font-bold text-primary">
                {entry.topic.title}
              </Link>
              <div className="mt-2 flex gap-x-3 text-xs font-bold">
                <span className="flex items-center gap-x-1">
                  <AiOutlineEye size={16} />
                  {entry.topic.viewCount}
                </span>
              </div>
            </div>
            <Entry entry={entry} />
          </div>
        ))}
      </div>
      <TopicCard />
    </div>
  );
};

export default Home;
