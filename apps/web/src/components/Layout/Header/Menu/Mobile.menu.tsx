import { useContext, Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import SearchBox from "../Search";
import { Button } from "@devsozluk/ui";
import { AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";
import { FiDownload, FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "@/services/auth";
import { setDownloadApplication } from "@/store/common/commonSlice";
import { HeaderContext } from "..";

let deferredPrompt: Event | null = null;

const MobileMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );
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
      if (outcome === "accepted") {
        dispatch(setDownloadApplication(true));
        setShowInstallButton(false);
      }
    }
  };

  const goGithubStar = () => {
    window.open("https://github.com/devsozluk/website/stargazers", "_blank");
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
                      {!checkSessionloading && !isLoggedIn && (
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
                      <Button
                        variant="dark"
                        onClick={goGithubStar}
                        className="items-center justify-center py-2 !text-xs !text-gray-300 group"
                      >
                        <AiOutlineStar
                          size={15}
                          className="text-gray-400 group-hover:text-yellow-400 duration-300 transition-all"
                        />
                        Github&apos;da bizi destekleyin
                      </Button>
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
                      {!checkSessionloading && isLoggedIn && (
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

export default MobileMenu;
