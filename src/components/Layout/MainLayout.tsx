import Sidebar from "@/components/Layout/Sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex justify-between py-5 h-[calc(100%-70px)] overflow-auto space-x-20">
        <Sidebar />
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
