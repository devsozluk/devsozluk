import useSpoiler from "@/hooks/useSpoiler";
import type { IEntry } from "@/types";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EntryActions from "./Entry.actions";

export type IEntryProps = IEntry & {
  className?: string;
};

const Entry: React.FC<IEntryProps> = ({
  id,
  content,
  created_at,
  author,
  className,
  upvotes,
  downvotes,
}) => {
  const spoiler = useSpoiler();
  const referenceDate = moment().startOf("seconds");
  const formattedDate = moment
    .utc(created_at)
    .local()
    .startOf("seconds")
    .from(referenceDate);

  return (
    <article className={classNames("text-base rounded-lg", className)}>
      <div>
        <div
          className="whitespace-pre-wrap line-clamp-3 !text-base w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-a:text-primary-400 format-strong:text-gray-400 format:font-normal format-invert"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <footer className="flex justify-between items-center mt-2">
        <Link
          href={"/profile/" + author.username}
          className="flex items-center"
        >
          <div className="inline-flex items-center mr-3 select-none">
            <Image
              className="mr-2 w-7 h-7 rounded"
              src={author.avatar_url}
              width={50}
              height={50}
              alt={author?.username as string}
            />
            <div className="text-sm text-gray-400 flex flex-col md:flex-row md:items-center">
              <p className="font-semibold text-gray-400">{author.name}</p>
              <span className="h-1 w-1 rounded-sm bg-gray-400 mx-2 hidden md:block"></span>
              <p>
                <time title="February 8th, 2022">{formattedDate}</time>
              </p>
            </div>
          </div>
        </Link>
        <EntryActions
          downvotes={downvotes}
          upvotes={upvotes}
          author={author}
          id={id}
        />
      </footer>
    </article>
  );
};

export default Entry;
