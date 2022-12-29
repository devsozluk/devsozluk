import Sidebar from "@/components/Layout/Sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex md:justify-between py-7 mt-40 md:mt-14">
        <Sidebar />
        <div className="w-full h-full md:ml-[300px] mx-8 md:mr-8 lg:ml-[440px]">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
