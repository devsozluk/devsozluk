import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen overflow-y-hidden">
      <Header />
      <Outlet />
    </div>
  );
};

export default AuthLayout;