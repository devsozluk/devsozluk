import type { IEntry } from "@/types";
import Image from "next/image";
import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Entry: React.FC<IEntry> = ({ content, created_at, author }) => {
    return (
        <div>
            {content}
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
                        <h5 className="text-sm font-bold text-primary">{author.name}</h5>
                        <p className="text-xs">{new Date(created_at).toString()}</p>
                    </div>
                    <Image width={20} height={20} className="h-8 w-8 rounded-lg" src={author.avatar_url} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Entry;