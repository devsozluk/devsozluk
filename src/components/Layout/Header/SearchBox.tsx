import React from "react";

import { BsSearch } from "react-icons/bs";

const SearchBox: React.FC = () => {
  return (
    <div className="group flex items-center py-2 px-4 gap-x-2 rounded-md border-tertiary border-[1px] text-placeholder">
      <input className="w-full bg-transparent outline-none group-focus:border-white transition-all" placeholder="Aramak istediğiniz konuyu yazın." />
      <BsSearch size={20} />
    </div>
  );
};

export default SearchBox;
