import { createContext, useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBox from "./Search";
import { Button } from "@devsozluk/ui";
import { AiOutlineMenu } from "react-icons/ai";
import { useAppSelector } from "@/utils/hooks";
import classNames from "classnames";
import MobileMenu from "./Menu/Mobile.menu";
import Dropdown from "./Dropdown";

interface HeaderContextProps {
  open: boolean;
  setOpen: Function;
}

export const HeaderContext = createContext<HeaderContextProps>(
  {} as HeaderContextProps
);

const Portal = () => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("body");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(<MobileMenu />, ref.current)
    : null;
};

export interface IHeaderProps {
  notificationShow?: boolean;
}

const Header: React.FC<IHeaderProps> = ({ notificationShow = true }) => {
  const [open, setOpen] = useState(false);
  const { isDownloadApplication } = useAppSelector((state) => state.common);
  const { checkSessionloading, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  return (
    <div
      className={classNames(
        "fixed top-14 left-0 right-0 z-30 flex items-center justify-center bg-gray-900 px-4 lg:px-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)]",
        {
          "!top-0": isDownloadApplication || !notificationShow,
        }
      )}
    >
      <div className="container flex justify-between w-full py-4 md:justify-between md:space-y-0">
        <Link href="/">
          <Image width={170} height={50} src="/logo.png" alt="DevSözlük Logo" />
        </Link>
        <div className="hidden lg:flex">
          <div className="w-full md:absolute md:w-96 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <SearchBox />
          </div>
          <div className="relative">
            <Menu />
          </div>
        </div>
        <div className="flex gap-x-2 lg:hidden">
          {!checkSessionloading && isLoggedIn && <Dropdown />}
          <Button
            onClick={() => setOpen(true)}
            className="inline-block lg:hidden !p-2 text-xs hover:bg-white/5"
            variant="link"
          >
            <AiOutlineMenu
              size={18}
              className="text-gray-400 transition-all duration-300 group-hover:text-yellow-400"
            />
          </Button>
        </div>
      </div>
      <HeaderContext.Provider value={{ open, setOpen }}>
        <Portal />
      </HeaderContext.Provider>
    </div>
  );
};

export default Header;
