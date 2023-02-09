import { useAppSelector } from "@/utils/hooks";
import Link from "next/link";
import { Fragment } from "react";
import Dropdown from "./Dropdown";

const Menu = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <Fragment>{!isLoggedIn ? <Menu.Navigations /> : <Dropdown />}</Fragment>
  );
};

const Navigations = () => (
  <div>
    <Link href="/uyelik/giris">giriş</Link>
    <Link href="/uyelik/kayit">kaydol</Link>
  </div>
);

Menu.Navigations = Navigations;

export default Menu;
