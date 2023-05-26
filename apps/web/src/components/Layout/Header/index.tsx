import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBox from "./Search";
import { useAppSelector } from "@/utils/hooks";
import classNames from "classnames";

const Header: React.FC = () => {
  const { isDownloadApplication } = useAppSelector((state) => state.common);

  return (
    <div
      className={classNames(
        "fixed top-14 left-0 right-0 z-30 flex items-center justify-center bg-gray-900 px-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)]",
        {
          "!top-0": isDownloadApplication,
        }
      )}
    >
      <div className="container w-full flex flex-col items-center md:flex-row py-4 space-y-3 md:justify-between md:space-y-0">
        <Link href="/">
          <Image width={170} height={80} src="/logo.png" alt="DevSözlük Logo" />
        </Link>
        <div className="md:absolute w-full md:w-96 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
          <SearchBox />
        </div>
        <div className="relative">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Header;
