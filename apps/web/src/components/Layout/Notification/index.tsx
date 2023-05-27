import { setDownloadApplication } from "@/store/common/commonSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Button, IconButton } from "@devsozluk/ui";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { useWindowSize } from "usehooks-ts";

let deferredPrompt: Event | null = null;

const Notification: React.FC = () => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { isDownloadApplication } = useAppSelector((state) => state.common);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const downloadStatus = localStorage.getItem("isDownloadApplication");

    if (width >= 700 && downloadStatus === "false") {
      dispatch(setDownloadApplication(false));
    }
  }, [width]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
      const check = localStorage.getItem("isDownloadApplication");
      if (!check) {
        dispatch(setDownloadApplication(false));
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [dispatch]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const { outcome } = await (deferredPrompt as any).userChoice;
      console.log(outcome === "accepted");

      if (outcome === "accepted") {
        dispatch(setDownloadApplication(true));
        setShowInstallButton(false);
      }
    }
  };

  const closeNotification = () => {
    dispatch(setDownloadApplication(true));
    setShowInstallButton(false);
  };

  if (isDownloadApplication) return <></>;

  return (
    <div
      id="banner"
      className="flex fixed z-50 gap-y-8 left-0 right-0 justify-between px-16 py-3 sm:items-center lg:py-3 bg-gray-800"
    >
      <div className="flex items-center justify-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
          Yeni Özellik!
        </span>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          DevSözlük artık{" "}
          <span className="text-blue-500">Progressive Web App (PWA)</span>{" "}
          desteği sunuyor!
        </p>
      </div>
      <div className="flex gap-x-2 items-center">
        <Button
          onClick={handleInstallClick}
          size="sm"
          variant="primary"
          className="ml-2 !py-1"
        >
          Uygulamayı İndir
        </Button>
        <IconButton onClick={closeNotification}>
          <CgClose size={18} />
        </IconButton>
      </div>
    </div>
  );
};

export default Notification;
