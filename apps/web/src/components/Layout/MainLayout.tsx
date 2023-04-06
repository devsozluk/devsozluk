import Header from "@/components/Layout/Header";
import { Fragment, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Header />
      <main className="mt-44 flex py-7 md:mt-14">
        <Sidebar />
        <div className="mx-8 h-full w-full md:ml-[300px] md:mr-8 lg:ml-[360px]">
          {children}
        </div>
      </main>
    </Fragment>
  );
}
