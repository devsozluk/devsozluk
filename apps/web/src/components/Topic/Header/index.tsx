import { ITopic } from "@/types";
import { IconButton } from "@devsozluk/ui";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";
import { MdComment, MdOutlineBookmarkAdd } from "react-icons/md";
import { IoMdEye } from "react-icons/io";

const TopicHeader = (topic: ITopic) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={"/topic/" + topic.slug}
        className="text-lg font-bold text-primary-400"
      >
        {topic.title}
      </Link>
      <div className="mt-2 flex gap-x-3 text-xs font-bold">
        <IconButton>
          <IoMdEye size={18} />
          {topic.viewsCount}
        </IconButton>
        <IconButton>
          <MdComment size={18} />
          {topic.entryCount}
        </IconButton>
        <IconButton>
          <MdOutlineBookmarkAdd size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default TopicHeader;
