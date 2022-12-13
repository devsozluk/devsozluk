import * as React from "react";
import { Link } from "react-router-dom";
import Input from "@/components/UI/Input/index";
import Icon from "@/components/UI/Icon/index";

const Header: React.FC = () => {
  return (
    <div className="fixed left-0 right-0 border-primary border-t-4 px-8 py-3 flex flex-col md:flex-row md:justify-between space-y-3 md:space-y-0 items-center">
      <Link to="/">
        <h1 className="text-primary font-bold text-3xl">DevLab.</h1>
      </Link>
      <div className="w-full md:w-[400px]">
        {/* <Input placeholder="Aramak istediğiniz konuyu yazın." rightIcon={<Icon icon="search" width={20} height={20} />} /> */}
      </div>
      <div className="space-x-2">
        <Link to="/auth/login">giriş</Link>
        <Link to="/auth/login">kaydol</Link>
      </div>
    </div>
  );
};

export default Header;
