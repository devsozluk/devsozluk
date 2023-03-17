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
  <div>
    <Link href="/uyelik/giris">giriş</Link>
    <Link href="/uyelik/kayit">kaydol</Link>
  </div>
);

Menu.Navigations = Navigations;

export default Menu;
