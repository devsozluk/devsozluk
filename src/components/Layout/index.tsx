import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <Header />
      <main className="flex justify-between py-5 h-[calc(100%-70px)] overflow-auto space-x-20">
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
