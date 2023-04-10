import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBox from "./SearchBox";

const Header: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex flex-col items-center space-y-3 bg-gray-900 px-8 py-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)] md:flex-row md:justify-between md:space-y-0">
      <Link href="/">
        <Image width={170} height={80} src="/logo.png" alt="DevSözlük Logo" />
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
