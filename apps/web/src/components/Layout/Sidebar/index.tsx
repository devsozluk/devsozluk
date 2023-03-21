import SidebarLoader from "@/components/Loading/sidebar";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import type { ITopic } from "@/types";
import { useGetLatestTopicsQuery } from "@/services/topic";

const Sidebar = () => {
  const { data, isLoading } = useGetLatestTopicsQuery("");

  useEffect(() => { }, []);

  return (
    <div className="fixed  hidden h-screen w-[250px] flex-col space-y-3 overflow-y-auto rounded px-5 scrollbar scrollbar-track-slate-700  scrollbar-thumb-primary  scrollbar-thumb-rounded scrollbar-w-2 hover:scrollbar-thumb-buttonPrimary md:flex lg:w-[300px]">
      {isLoading ? (
        <SidebarLoader />
      ) : (
        <Fragment>
          {data?.map((topic: any) => (
            <Sidebar.Item {...topic} />
          ))}
        </Fragment>
      )}
    </div>
  );
};

Sidebar.Item = ({ slug, title, entryCount }: ITopic) => (
  <Link
    className="flex items-center justify-between break-words rounded px-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
    href={"/topic/" + slug}
  >
    <p className="truncate">{title}</p>
    <span className="ml-5 text-sm">{entryCount || 0}</span>
  </Link>
);

export default Sidebar;
