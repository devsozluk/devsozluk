import { ITopic } from "@/types";
import { IconButton } from "@devsozluk/ui";
import Link from "next/link";
import { Fragment } from "react";
import { IoMdEye } from "react-icons/io";
import { MdComment, MdOutlineBookmarkAdd } from "react-icons/md";
import SocialShare from "./SocialShare";

export interface ITopicHeader {
  topic: ITopic;
  showDetail?: boolean;
}

const TopicHeader = ({ topic, showDetail }: ITopicHeader) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={"/topic/" + topic.slug}
        className="text-lg font-bold text-primary-400 truncate"
      >
        {topic.title}
      </Link>
      <div className="mt-2 flex gap-x-3 text-xs font-bold">
        <IconButton>
          <IoMdEye size={14} />
          {topic.viewsCount}
        </IconButton>
        <IconButton>
          <MdComment size={14} />
          {topic.entryCount}
        </IconButton>
        {showDetail && (
          <Fragment>
            <IconButton>
              <MdOutlineBookmarkAdd size={14} />
            </IconButton>
            <SocialShare {...topic} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default TopicHeader;
