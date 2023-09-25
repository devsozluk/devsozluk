import { ITopic } from "@/types";
import { IconButton } from "@devsozluk/ui";
import Link from "next/link";
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
        className="text-lg font-bold truncate text-primary-400"
      >
        {topic.title}
      </Link>
      <div className="flex mt-2 text-xs font-bold gap-x-3">
        <IconButton>
          <IoMdEye size={14} />
          {topic.viewsCount}
        </IconButton>
        <IconButton>
          <MdComment size={14} />
          {topic.entryCount}
        </IconButton>
        {showDetail && (
          <>
            <IconButton disabled>
              <MdOutlineBookmarkAdd size={14} />
            </IconButton>
            <SocialShare {...topic} />
          </>
        )}
      </div>
    </div>
  );
};

export default TopicHeader;
