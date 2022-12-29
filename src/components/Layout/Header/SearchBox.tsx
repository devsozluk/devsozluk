import Spinner from "@/components/Loading";
import React, { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="group flex flex-col">
      <div className="flex items-center py-2 px-4 gap-x-2 rounded-md text-placeholder bg-gray-800 z-50">
        <BsSearch size={20} />
        <input
          className="w-full bg-transparent outline-none group-focus:border-white transition-all placeholder:text-placeholder"
          placeholder="Aramak istediğiniz konuyu yazın."
        />
      </div>
      <div
        tabIndex={0}
        className="hidden group-focus-within:flex absolute items-center justify-center bg-gray-800 h-60 w-[400px] rounded top-16 z-50"
      >
        <Spinner variant="primary" size="md" />
      </div>
    </div>
  );
};

export default SearchBox;
