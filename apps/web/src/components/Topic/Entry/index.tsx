import type { IEntry } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import classNames from "classnames";
import { IconButton } from "@devsozluk/ui";
import { useAppSelector } from "@/utils/hooks";
import {
  useDeleteEntryVoteMutation,
  useEntryVoteMutation,
} from "@/services/topic";
import { toast } from "react-hot-toast";

export type IEntryProps = IEntry & {
  className?: string;
};

const Entry: React.FC<IEntryProps> = ({
  id,
  content,
  created_at,
  author,
  className,
  upvotes: initialUpvotes,
  downvotes: initialDownvotes,
}) => {
  const [handleEntryVote, { data, error, isLoading, status }] =
    useEntryVoteMutation();
  const [
    deleteEntryVote,
    { data: deleteData, isLoading: deleteIsLoading, status: deleteStatus },
  ] = useDeleteEntryVoteMutation();
  const referenceDate = moment().startOf("seconds");
  const formattedDate = moment
    .utc(created_at)
    .local()
    .startOf("seconds")
    .from(referenceDate);

  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const userVotes = useAppSelector((state) => state.user.votes);

  const hasUserVote = userVotes?.find((vote) => vote.entry == id);
  const hasUpVote = userVotes?.find((vote) => vote.entry == id && vote.upvoted);
  const hasDownVote = userVotes?.find(
    (vote) => vote.entry == id && vote.downvoted
  );

  const handleVote = async (type: "up" | "down") => {
    if (!isLoggedIn)
      return toast.error("Entry'e oy vermek için lütfen önce giriş yapın.");

    if (
      (hasUserVote?.downvoted && type === "down") ||
      (hasUserVote?.upvoted && type === "up")
    ) {
      await deleteEntryVote({
        author: user?.id as string,
        entry: id as number,
      });
    } else {
      if (hasUserVote)
        await deleteEntryVote({
          author: user?.id as string,
          entry: id as number,
        });
      await handleEntryVote({
        author: user?.id as string,
        entry: id as number,
        type,
      });
    }
  };

  useEffect(() => {
    if (status === "fulfilled" && data) {
      if (data.upvoted) setUpvotes((prevCount) => prevCount + 1);
      else setDownvotes((prevCount) => prevCount + 1);
    }
  }, [status]);

  useEffect(() => {
    if (deleteStatus === "fulfilled" && deleteData) {
      if (deleteData.upvoted) {
        setUpvotes((prevCount) => prevCount - 1);
      } else if (deleteData.downvoted) {
        setDownvotes((prevCount) => prevCount - 1);
      }
    }
  }, [deleteStatus]);

  return (
    <article className={classNames("text-base rounded-lg", className)}>
      <p className="text-gray-400">{content}</p>
      <footer className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <div className="inline-flex items-center mr-3 select-none">
            <Image
              className="mr-2 w-6 h-6 rounded"
              src={author.avatar_url}
              width={24}
              height={24}
              alt={author?.username as string}
            />
            <div className="text-sm text-white flex items-center">
              {author.name}
              <span className="h-1 w-1 rounded-sm bg-gray-400 mx-2"></span>
              <p className="text-gray-400">
                <time title="February 8th, 2022">{formattedDate}</time>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 text-xs font-bold">
          <IconButton
            isActive={hasUpVote}
            disabled={isLoading || deleteIsLoading}
            onClick={() => handleVote("up")}
          >
            <GoTriangleUp size={16} />
            {upvotes}
          </IconButton>
          <IconButton
            isActive={hasDownVote}
            disabled={isLoading || deleteIsLoading}
            onClick={() => handleVote("down")}
          >
            <GoTriangleDown size={16} />
            {downvotes}
          </IconButton>
          <IconButton id="dropdownComment1Button" type="button">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
            </svg>
            <span className="sr-only">Comment settings</span>
          </IconButton>
        </div>
        <div
          id="dropdownComment1"
          className="hidden z-10 w-36 rounded divide-y shadow bg-gray-700 divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
              >
                Remove
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
              >
                Report
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </article>
  );
};

export default Entry;
