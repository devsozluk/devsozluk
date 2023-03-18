import Link from "next/link";
import * as React from "react";
import { AiFillGithub } from "react-icons/ai";

interface AuthLayoutProps {
  children: React.ReactNode;
}

interface AuthLayoutDescription {
  children: React.ReactNode;
  link: string;
  linkText: string;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const githubLogin = () => {};

  return (
    <div className="flex h-full flex-col items-center md:justify-center  ">
      <div className="mt-36 flex w-full flex-col  items-center justify-center space-y-5  md:mt-0 md:w-[500px]">
        <div className="w-full">{children}</div>
        <p className="text-placeholder">veya</p>
        <button
          onClick={githubLogin}
          className="text-md flex h-14 w-full items-center justify-center rounded bg-[#21262d] font-medium text-[#c9d1d9] shadow-lg transition duration-200 ease-in-out focus:outline-none   hover:shadow-2xl"
        >
          <AiFillGithub size={24} color="#c9d1d9" className="mr-2" />
          Github ile giriş yap
        </button>
      </div>
    </div>
  );
};

AuthLayout.Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="my-4 text-center text-4xl font-extrabold">
    {children}
    <span className="text-buttonPrimary">.</span>
  </h1>
);

AuthLayout.Description = ({
  children,
  link,
  linkText,
}: AuthLayoutDescription) => (
  <p className="mb-6 space-x-4 text-center text-placeholder">
    {children}
    <Link href={link} className="ml-1 text-buttonPrimary">
      {linkText}
    </Link>
  </p>
);

export default AuthLayout;
