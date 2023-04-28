import SidebarLoader from "@/components/Loading/sidebar";
import { useGetPopularTopicsMutation } from "@/services/topic";
import type { ITopic } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import Link from "next/link";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Sidebar = () => {
  const [page, setPage] = useState(0);
  const [getPopularTopics, { isLoading }] = useGetPopularTopicsMutation();
  const { sidebarTopics } = useAppSelector((state) => state.topic);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
    getPopularTopics({ page: page + 1 });
  };

  return (
    <div
      className="fixed hidden h-[87%] w-[250px] flex-col space-y-3 overflow-y-scroll rounded pr-5 scrolbar md:flex lg:w-[300px]"
      id="scrollableSidebar"
    >
      <InfiniteScroll
        className="flex flex-col space-y-3 overflow-y-scroll rounded pr-5"
        loader={isLoading && <SidebarLoader />}
        next={fetchMoreData}
        dataLength={sidebarTopics?.length}
        hasMore={true}
        scrollableTarget="scrollableSidebar"
      >
        {sidebarTopics?.map((topic: any) => (
          <Sidebar.Item key={topic.id} {...topic} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

Sidebar.Item = ({ slug, title, entryCount }: ITopic) => (
  <Link
    className="flex items-center text-gray-400 justify-between break-words rounded pr-2 py-1 pl-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
    href={"/topic/" + slug}
  >
    <p className="truncate">{title}</p>
    <span className="ml-5 text-sm">{entryCount || 0}</span>
  </Link>
);

export default Sidebar;
