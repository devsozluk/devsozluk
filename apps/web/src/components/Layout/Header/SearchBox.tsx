import { Input } from "@devsozluk/ui";
import React, { Fragment, useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { BsSearch } from "react-icons/bs";
import { useSearchTopicsMutation } from "@/services/topic";
import SearchSkeleton from "@/components/Loading/search";
import { ITopic } from "@/types";
import Link from "next/link";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [handleSearch, { data, isLoading }] = useSearchTopicsMutation();

  useEffect(() => {
    handleSearch({ text: debouncedValue });
  }, [debouncedValue]);

  return (
    <div className="group relative">
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Aramak istediğiniz kelimeyi girin."
        renderLeftIcon={<BsSearch size={20} />}
        className="h-10 border-opacity-50"
      />
      <div
        className="group-focus-within:flex bg-gray-800 transition-all z-10 h-56 w-full absolute hidden p-3 gap-y-4 flex-col"
        tabIndex={0}
      >
        {isLoading ? (
          <SearchBox.Loader />
        ) : (
          <Fragment>
            {data?.map((topic: ITopic) => (
              <SearchBox.Item {...topic} />
            ))}
          </Fragment>
        )}
      </div>
    </div>
  );
};

SearchBox.Item = ({ slug, entryCount, title }: ITopic) => {
  return (
    <Link
      className="flex items-center justify-between break-words rounded px-2 py-1 text-base transition-all hover:bg-buttonPrimary hover:text-white "
      href={"/topic/" + slug}
    >
      <p className="truncate">{title}</p>
      <span className="ml-5 text-sm">{entryCount || 0}</span>
    </Link>
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
