import {
  createContext,
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import SearchBox from "./Search";
import { Button } from "@devsozluk/ui";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "@/utils/hooks";
import classNames from "classnames";
import { useRouter } from "next/router";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "@/services/auth";
import { setDownloadApplication } from "@/store/common/commonSlice";

let deferredPrompt: Event | null = null;

interface HeaderContextProps {
  open: boolean;
  setOpen: Function;
}

const HeaderContext = createContext<HeaderContextProps>(
  {} as HeaderContextProps
);

const MobileMenu = () => {
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { open, setOpen } = useContext(HeaderContext);
  const [logout] = useLogoutMutation();

  const goLoginPage = () => {
    router.push("/auth/login");
  };

  const goRegisterPage = () => {
    router.push("/auth/register");
  };

  const handleLogout = () => {
    logout("");
  };

  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const { outcome } = await (deferredPrompt as any).userChoice;
      console.log(outcome === "accepted");

      if (outcome === "accepted") {
        setShowInstallButton(false);
      }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative block lg:hidden z-50"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <AiOutlineClose size={20} />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 py-6 shadow-xl">
                    <div className="flex flex-col w-full space-y-4 px-4 sm:px-6">
                      <SearchBox />
                      {!isLoggedIn && (
                        <Fragment>
                          <Button
                            onClick={goLoginPage}
                            className="text-xs font-normal !px-6 w-full"
                            size="sm"
                            variant="dark"
                          >
                            Giriş
                          </Button>
                          <Button
                            onClick={goRegisterPage}
                            className="text-xs font-normal !px-6 w-full"
                            size="sm"
                            variant="primary"
                          >
                            Kayıt Ol
                          </Button>
                        </Fragment>
                      )}
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6 flex gap-y-4 flex-col justify-end">
                      {showInstallButton && (
                        <Button
                          onClick={handleInstallClick}
                          size="sm"
                          variant="primary"
                        >
                          <FiDownload />
                          Uygulamayı Yükle
                        </Button>
                      )}
                      {isLoggedIn && (
                        <Button
                          onClick={handleLogout}
                          size="sm"
                          variant="danger"
                        >
                          <FiLogOut />
                          Çıkış Yap
                        </Button>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

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

  return (
    <div
      className={classNames(
        "fixed top-14 left-0 right-0 z-30 flex items-center justify-center bg-gray-900 px-8 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.30)]",
        {
          "!top-0": isDownloadApplication || !notificationShow,
        }
      )}
    >
      <div className="container w-full flex justify-between py-4 md:justify-between md:space-y-0">
        <Link href="/">
          <Image width={170} height={70} src="/logo.png" alt="DevSözlük Logo" />
        </Link>
        <div className="hidden lg:flex">
          <div className="md:absolute w-full md:w-96 md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
            <SearchBox />
          </div>
          <div className="relative">
            <Menu />
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="inline-block lg:hidden !p-2 text-xs hover:bg-white/5"
          variant="link"
        >
          <AiOutlineMenu
            size={18}
            className="text-gray-400 group-hover:text-yellow-400 duration-300 transition-all"
          />
        </Button>
      </div>
      <HeaderContext.Provider value={{ open, setOpen }}>
        <Portal />
      </HeaderContext.Provider>
    </div>
  );
};

export default Header;
