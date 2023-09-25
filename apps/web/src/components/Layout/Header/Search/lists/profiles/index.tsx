import SearchSkeleton from "@/components/Loading/search";
import { IProfile } from "@/types";
import Image from "next/image";
import Link from "next/link";

export interface IProfilesProps {
  className?: string;
  profiles: IProfile[];
}

const Profiles = ({ profiles }: IProfilesProps) => {
  return (
    <>
      {profiles?.length >= 1 && (
        <div>
          <div className="mb-1">
            <p className="text-sm text-gray-400">Kullanıcılar</p>
          </div>
          {profiles?.map((topic: IProfile) => (
            <Profiles.Item key={topic.id} {...topic} />
          ))}
        </div>
      )}
    </>
  );
};

Profiles.Item = ({ name, username, avatar_url }: IProfile) => {
  return (
    <Link
      className="flex items-center py-1 text-base text-gray-200 break-words rounded gap-x-1"
      href={"/profile/" + username}
    >
      <Image
        className="flex-shrink-0 object-cover w-6 h-6 mx-1 rounded-full"
        width={100}
        height={100}
        src={avatar_url}
        alt={avatar_url}
      />
      <p className="mr-1 truncate hover:underline">{name}</p>
      <p className="text-sm text-gray-400">@{username}</p>
    </Link>
  );
};

Profiles.NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400">Sonuç bulunamadı.</p>
    </div>
  );
};

Profiles.Loader = () => {
  return (
    <>
      <SearchSkeleton />
      <SearchSkeleton />
    </>
  );
};

export default Profiles;
