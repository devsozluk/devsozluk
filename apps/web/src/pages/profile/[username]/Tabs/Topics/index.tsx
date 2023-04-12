import { useGetUserTopicsQuery } from "@/services/topic";
import { IProfile, ITopic } from "@/types";
import { IconButton } from "@devsozluk/ui";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import { MdComment, MdOutlineBookmarkAdd } from "react-icons/md";

export const Topics = ({ id }: IProfile) => {
  const { data, isLoading } = useGetUserTopicsQuery(id);

  if (isLoading) return <div>loading...</div>;
  else if (data.length === 0) return <NotTopics />;
  else {
    return (
      <div className="w-ful mt-4 flex gap-y-4 flex-col">
        {data.map((topic: ITopic) => (
          <Topics.Item {...topic} />
        ))}
      </div>
    );
  }
};

Topics.Item = (topic: ITopic) => {
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

const NotTopics = () => {
  return (
    <div className="max-w-lg mt-4">
      <div>
        <p className="text-sm text-gray-400">
          kullanıcı henüz bir konu açmamış.
        </p>
      </div>
    </div>
  );
};

export default Topics;
