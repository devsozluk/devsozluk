import Header from "@/components/Layout/Header";
import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-center">
      <Header />
      <main className="mt-16 flex py-7 px-4 sm:px-0 container justify-center md:justify-start">
        <Sidebar />
        <div className="mx-8 h-full w-full lg:ml-[360px]">
          {children}
        </div>
      </main>
    </div>
  );
}