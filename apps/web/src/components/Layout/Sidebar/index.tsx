import SidebarLoader from "@/components/Loading/sidebar";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import type { ITopic } from "@/types";
import { useGetPopularTopicsMutation } from "@/services/topic";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const [getPopularTopics, { data, isLoading }] = useGetPopularTopicsMutation();

  useEffect(() => {
    getPopularTopics("");
  }, [router]);

  return (
    <div className="fixed hidden h-[84%] w-[250px] flex-col space-y-3 overflow-y-scroll rounded px-5 scrolbarr md:flex lg:w-[300px]">
      {isLoading ? (
        <SidebarLoader />
      ) : (
        <Fragment>
          {data?.map((topic: any) => (
            <Sidebar.Item key={topic.id} {...topic} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

Sidebar.Item = ({ slug, title, entryCount }: ITopic) => (
  <Link
    className="flex items-center text-gray-400 justify-between break-words rounded px-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
    href={"/topic/" + slug}
  >
    <p className="truncate">{title}</p>
    <span className="ml-5 text-sm">{entryCount || 0}</span>
  </Link>
);

export default Sidebar;
