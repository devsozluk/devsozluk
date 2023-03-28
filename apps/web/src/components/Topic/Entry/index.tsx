import type { IEntry } from "@/types";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export type IEntryProps = IEntry & {
  className?: string;
};

const Entry: React.FC<IEntryProps> = ({
  content,
  created_at,
  author,
  className,
}) => {
  const referenceDate = moment().startOf("seconds");
  const formattedDate = moment
    .utc(created_at)
    .local()
    .startOf("seconds")
    .from(referenceDate);

  return (
    <div className={className}>
      <p>{content}</p>
      <div className="flex justify-between items-center">
        <div className="mt-5 flex h-full gap-x-3 text-xs font-bold">
          <button className="flex transition-all items-center gap-x-1 rounded p-1 hover:bg-buttonPrimary hover:text-white">
            <AiOutlineArrowUp size={16} />0
          </button>
          <button className="flex transition-all  items-center gap-x-1 rounded p-1 hover:bg-buttonPrimary hover:text-white">
            <AiOutlineArrowDown size={16} />0
          </button>
        </div>
        <div className="mt-5 flex gap-x-2 select-none">
          <div className="text-right">
            <h5 className="text-sm font-bold text-primary">{author.name}</h5>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
          <Image
            width={20}
            height={20}
            className="h-8 w-8 rounded-lg select-none"
            src={author.avatar_url}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Entry;
