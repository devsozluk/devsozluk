import altogic from "@/libs/altogic";
import * as React from "react";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const githubLogin = () => {
    altogic.auth.signInWithProvider("github");
  };

  return (
    <div className="flex h-full flex-col  items-center justify-center  ">
      <div className="flex w-[500px] flex-col items-center justify-center space-y-5">
        <div className="w-full">{children}</div>
        <p className="text-placeholder">veya</p>
        <button
          onClick={githubLogin}
          className="text-md flex h-14 w-full items-center justify-center rounded bg-[#21262d] font-medium text-[#c9d1d9] shadow-lg"
        >
          <AiFillGithub size={24} color="#c9d1d9" className="mr-2" />
          Github ile giriş yap
        </button>
      </div>
    </div>
  );
};

export const AuthLayoutTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="my-4 text-center text-4xl font-extrabold">
    {children}
    <span className="text-buttonPrimary">.</span>
  </h1>
);

export const AuthLayoutDescription: React.FC<{ children: React.ReactNode; link: string; linkText: string }> = ({ children, link, linkText }) => (
  <p className="mb-6 space-x-4 text-center text-placeholder">
    {children}
    <Link to={link} className="ml-1 text-buttonPrimary">
      {linkText}
    </Link>
  </p>
);

export default AuthLayout;
