import SearchSkeleton from "@/components/Loading/search";
import { useSearchTopicsMutation } from "@/services/topic";
import { ITopic } from "@/types";
import { Input } from "@devsozluk/ui";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { useDebounce } from "usehooks-ts";

export interface ITopicsProps {
  className?: string;
  topics: ITopic[];
}

const Topics = ({ topics }: ITopicsProps) => {
  return (
    <Fragment>
      {topics?.length >= 1 && (
        <div>
          <div>
            <p className="text-gray-400 text-sm">Konular</p>
          </div>
          {topics?.map((topic: ITopic) => (
            <Topics.Item key={topic.id} {...topic} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

Topics.Item = ({ slug, entryCount, title }: ITopic) => {
  return (
    <Link
      className="flex items-center justify-between break-words rounded py-1 text-base"
      href={"/topic/" + slug}
    >
      <p className="truncate">{title}</p>
      <span className="ml-5 text-sm">{entryCount || 0}</span>
    </Link>
  );
};

export default Topics;
