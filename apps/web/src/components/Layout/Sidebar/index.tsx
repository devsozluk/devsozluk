import SidebarLoader from "@/components/Loading/sidebar";
import { useGetPopularTopicsMutation } from "@/services/topic";
import type { ITopic } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [getPopularTopics, { data, isLoading }] = useGetPopularTopicsMutation();

  useEffect(() => {
    getPopularTopics("");
  }, []);

  return (
    <div className="absolute hidden h-[87%] w-[250px] flex-col space-y-3 overflow-y-scroll rounded pr-5 scrolbar md:flex lg:w-[300px]">
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
    className="flex items-center text-gray-400 justify-between break-words rounded pr-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
    href={"/topic/" + slug}
  >
    <p className="truncate">{title}</p>
    <span className="ml-5 text-sm">{entryCount || 0}</span>
  </Link>
);

export default Sidebar;
