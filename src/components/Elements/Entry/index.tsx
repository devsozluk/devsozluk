import { MarkdownPreview } from "@/components/Elements/Markdown";
import type { IEntry } from "@/types";
import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

interface Props {
  entry: IEntry;
}

const Entry: React.FC<Props> = ({ entry }) => {
  return (
    <div>
      <MarkdownPreview content={entry.content} />
      <div className="flex justify-between">
        <div className="mt-5 flex h-full gap-x-3 text-xs font-bold">
          <button className="flex items-center gap-x-1 rounded p-1 hover:bg-primary hover:text-white">
            <AiOutlineArrowUp size={16} />0
          </button>
          <button className="flex items-center gap-x-1 rounded p-1 hover:bg-primary hover:text-white">
            <AiOutlineArrowDown size={16} />0
          </button>
        </div>
        <div className="mt-5 flex gap-x-2">
          <div className="text-right">
            <h5 className="text-sm font-bold text-primary">{entry.author.name}</h5>
            <p className="text-xs">{new Date(entry.createdAt).toLocaleString()}</p>
          </div>
          <img className="h-8 w-8 rounded-lg" src={entry.author.profilePicture} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Entry;
