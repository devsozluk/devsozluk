import Header from "@/components/Layout/Header";
import { PropsWithChildren, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Notification from "./Notification";
import { useAppSelector } from "@/utils/hooks";
import classNames from "classnames";

export default function MainLayout({ children }: PropsWithChildren) {
  const { isDownloadApplication } = useAppSelector((state) => state.common);

  return (
    <div className="flex justify-center">
      <Notification />
      <Header />
      <main
        className={classNames(
          "mt-16 flex py-7 px-4 sm:px-0 container justify-center md:justify-start",
          { "md:!mt-28": !isDownloadApplication }
        )}
      >
        <Sidebar />
        <div className="mx-8 h-full w-full lg:ml-[360px]">
          {children}
        </div>
      </main>
    </div>
  );
}