import { Input } from "@devsozluk/ui";
import React, { useEffect, useState } from "react";

import { BsSearch } from "react-icons/bs";

const SearchBox: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => { }, [searchValue]);

  return (
    <Input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Aramak istediğiniz kelimeyi girin."
      renderLeftIcon={<BsSearch size={20} />}
      className="h-10 border-opacity-50"
    />
  );
};

export default SearchBox;
