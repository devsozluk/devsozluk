import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import * as React from "react";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="flex justify-between py-5">
        <Sidebar />
        <div className="w-[12px] bg-[#3D3D3D] rounded-sm mx-10"></div>
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
