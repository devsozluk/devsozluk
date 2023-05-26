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
          "mt-40 flex py-7 md:mt-14 px-4 sm:px-0 md:px-8 lg:px-0 container justify-center md:justify-start",
          { "md:!mt-28": !isDownloadApplication }
        )}
      >
        <Sidebar />
        <div className="mx-8 h-full w-full md:ml-[300px] lg:ml-[360px]">
          {children}
        </div>
      </main>
    </div>
  );
}
