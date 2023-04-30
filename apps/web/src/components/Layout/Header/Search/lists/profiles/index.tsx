import SearchSkeleton from "@/components/Loading/search";
import { IProfile, ITopic } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

export interface IprofilesProps {
  className?: string;
  profiles: IProfile[];
}

const Profiles = ({ profiles }: IprofilesProps) => {
  return (
    <Fragment>
      {profiles?.length >= 1 && (
        <div>
          <div className="mb-1">
            <p className="text-gray-400 text-sm">Kullanıcılar</p>
          </div>
          {profiles?.map((topic: IProfile) => (
            <Profiles.Item key={topic.id} {...topic} />
          ))}
        </div>
      )}
    </Fragment>
  );
};

Profiles.Item = ({ name, username, avatar_url }: IProfile) => {
  return (
    <Link
      className="flex items-center gap-x-1 break-words rounded text-base py-1"
      href={"/profile/" + username}
    >
      <Image
        className="flex-shrink-0 object-cover mx-1 rounded-full w-6 h-6"
        width={100}
        height={100}
        src={avatar_url}
        alt={avatar_url}
      />
      <p className="truncate hover:underline mr-1">{name}</p>
      <p className="text-gray-400 text-sm">@{username}</p>
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
    <Fragment>
      <SearchSkeleton />
      <SearchSkeleton />
    </Fragment>
  );
};

export default Profiles;
