import Header from "@/components/Layouts/Header";
import Sidebar from "@/components/Layouts/Sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";

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
