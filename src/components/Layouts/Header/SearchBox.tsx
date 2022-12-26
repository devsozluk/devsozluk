import React from "react";

import { BsSearch } from "react-icons/bs";

const SearchBox: React.FC = () => {
  return (
    <div className="flex items-center py-2 px-4 gap-x-2 rounded-md border-tertiary border-[1px] text-placeholder">
      <BsSearch size={20} />
      <input className="w-full bg-transparent outline-none" placeholder="Aramak istediğiniz konuyu yazın." />
    </div>
  );
};

export default SearchBox;
