import SearchSkeleton from "@/components/Loading/search";
import { useSearchTopicsMutation } from "@/services/topic";
import { ITopic } from "@/types";
import { Input } from "@devsozluk/ui";
import classNames from "classnames";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import { useDebounce } from "usehooks-ts";

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
        renderLeftIcon={
          searchValue.length > 0 ? undefined : (
            <BsSearch size={14} className="text-gray-400" />
          )
        }
        renderRightIcon={
          searchValue.length >= 1 ? (
            <IoMdCloseCircle
              size={15}
              className="text-gray-400 cursor-pointer"
              onClick={() => setSearchValue("")}
            />
          ) : undefined
        }
        className="!h-10"
      />
      <div
        className={classNames(
          "bg-gray-800 transition-all z-10 h-56 w-full absolute hidden p-3 gap-y-4 flex-col",
          { "group-focus-within:flex": searchValue.length > 0 }
        )}
        tabIndex={0}
      >
        {isLoading ? (
          <SearchBox.Loader />
        ) : (
          <Fragment>
            {data?.length === 0 ? (
              <SearchBox.NotFound />
            ) : (
              data?.map((topic: ITopic) => <SearchBox.Item {...topic} />)
            )}
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
