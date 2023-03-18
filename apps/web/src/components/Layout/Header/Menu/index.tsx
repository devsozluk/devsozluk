import Link from "next/link";
import { Fragment } from "react";

const Menu = () => {
  return (
    <Fragment>
      <Menu.Navigations />
    </Fragment>
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
