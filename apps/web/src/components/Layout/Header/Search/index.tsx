import SearchSkeleton from "@/components/Loading/search";
import { topicApi, useSearchTopicsMutation } from "@/services/topic";
import { ITopic } from "@/types";
import { Input, Spinner } from "@devsozluk/ui";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { useDebounce } from "usehooks-ts";
import Topics from "./lists/topics";
import Profiles from "./lists/profiles";
import { useSearchProfileMutation } from "@/services/user";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [handleSearchTopic, { data: topics, isLoading: topicsLoading }] =
    useSearchTopicsMutation();
  const [handleSearchProfile, { data: users, isLoading: profileLoading }] =
    useSearchProfileMutation();

  useEffect(() => {
    handleSearchTopic({ text: debouncedValue });
    handleSearchProfile({ text: debouncedValue });
  }, [debouncedValue]);

  return (
    <div className="group relative">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Aramak istediğiniz kelimeyi girin."
        renderLeftIcon={
          searchValue.length > 0 ? undefined : (
            <BsSearch size={14} className="text-gray-400" />
          )
        }
        renderRightIcon={
          searchValue.length >= 1 && (
            <IoMdCloseCircle
              size={15}
              className="text-gray-400 cursor-pointer"
              onClick={() => setSearchValue("")}
            />
          )
        }
        className="!h-10"
      />
      <div
        className={classNames(
          "bg-gray-800 transition-all z-10 h-56 w-full absolute hidden p-3 gap-y-4 flex-col overflow-y-scroll",
          { "group-focus-within:flex": searchValue.length > 0 }
        )}
        tabIndex={0}
      >
        {topicsLoading || topicsLoading ? (
          <SearchBox.Loader />
        ) : topics?.length === 0 && users?.length === 0 ? (
          <SearchBox.NotFound />
        ) : (
          <Fragment>
            <Topics topics={topics} />
            <Profiles profiles={users} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

SearchBox.NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400">Sonuç bulunamadı.</p>
    </div>
  );
};

SearchBox.Loader = () => {
  return (
    <Fragment>
      <SearchSkeleton />
      <SearchSkeleton />
      <SearchSkeleton />
      <SearchSkeleton />
      <SearchSkeleton />
      <SearchSkeleton />
    </Fragment>
  );
};

export default SearchBox;
