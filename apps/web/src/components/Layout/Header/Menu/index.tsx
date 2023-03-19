import { useAppSelector } from "@/utils/hooks";
import Link from "next/link";
import { Fragment } from "react";
import Dropdown from "./Dropdown";

const Menu = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <Fragment>{isLoggedIn ? <Dropdown /> : <Menu.Navigations />}</Fragment>
  );
};

const Navigations = () => (
  <div className="flex space-x-2 ">
    <Link href="/auth/login">giriş</Link>
    <Link href="/auth/register">kaydol</Link>
  </div>
);

Menu.Navigations = Navigations;

export default Menu;
