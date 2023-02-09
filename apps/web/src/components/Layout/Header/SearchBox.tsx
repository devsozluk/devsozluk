import React from "react";

import { BsSearch } from "react-icons/bs";

const SearchBox: React.FC = () => {
  // const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  // }, [searchValue]);

  return (
    <div className="group z-10 flex flex-col">
      <div className="flex items-center gap-x-2 rounded-md bg-gray-800 py-2 px-4 text-placeholder">
        <BsSearch size={20} />
        <input
          className="w-full bg-transparent outline-none transition-all placeholder:text-placeholder group-focus:border-white"
          placeholder="Aramak istediğiniz konuyu yazın."
        />
      </div>
      {/* <div
        tabIndex={5}
        className="absolute top-16 z-10 hidden h-60 w-[400px] items-center justify-center rounded bg-gray-800 transition-all group-focus-within:flex"
      >
        <Spinner variant="primary" size="md" />
      </div> */}
    </div>
  );
};

export default SearchBox;
