import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBox from "./SearchBox";

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-col items-center space-y-3 border-t-2 border-primary bg-background px-8 py-3 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:flex-row md:justify-between md:space-y-0">
      <Link href="/">
        <h1 className="text-3xl font-bold text-primary">DevSözlük.</h1>
      </Link>
      <div className="md:absolute w-full md:w-96 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
        <SearchBox />
      </div>
      <div>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
