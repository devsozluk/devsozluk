import Markdown from "@/components/Markdown";
import type { IEntry } from "@/types";
import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface Props {
  entry: IEntry;
}

const Entry: React.FC<Props> = ({ entry }) => {
  return (
    <div>
      <Markdown content={entry.content} />
      <div className="flex justify-between">
        <div className="flex gap-x-3 text-xs font-bold mt-5 h-full">
          <button className="flex items-center rounded p-1 gap-x-1 hover:bg-primary hover:text-white">
            <AiOutlineArrowUp size={16} />0
          </button>
          <button className="flex items-center rounded p-1 gap-x-1 hover:bg-primary hover:text-white">
            <AiOutlineArrowDown size={16} />0
          </button>
        </div>
        <div className="flex gap-x-2 mt-5">
          <div className="text-right">
            <h5 className="text-primary font-bold text-sm">{entry.author.name}</h5>
            <p className="text-xs">{new Date(entry.createdAt).toLocaleString()}</p>
          </div>
          <img className="w-8 h-8 rounded-lg" src="https://osmandlsmn.me/images/avatar.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Entry;
