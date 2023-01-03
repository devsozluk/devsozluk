import * as React from "react";
import { Outlet } from "react-router-dom";
import CreateTopicModal from "../CreateTopicModal";
import Header from "./Header";

const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <Header />
      <CreateTopicModal />
      <main className="flex h-[calc(100%-10px)] justify-between space-x-20 overflow-auto py-5">
        <div className="h-full w-full px-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
