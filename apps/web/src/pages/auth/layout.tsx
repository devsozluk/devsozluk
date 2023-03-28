import supabase from "@/libs/supabase";
import Image from "next/image";
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
  const githubLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <div className="flex h-full flex-col items-center md:justify-center">
      <div className="fixed top-0 left-0 right-0 z-30 flex flex-col items-center bg-background py-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:flex-row md:justify-center md:space-y-0">
        <Link href="/">
          <Image width={170} height={80} src="/logo.png" alt="DevSözlük Logo" />
        </Link>
      </div>
      <div className="flex w-full flex-col  items-center justify-center px-5 mt-20 md:mt-0 md:mx-0  space-y-5 md:w-[500px]">
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
