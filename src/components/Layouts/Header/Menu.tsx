import { authLogout } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Menu } from "@headlessui/react";
import React, { Fragment } from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { links } from "./Links.constant";

const ProfileMenu: React.FC = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Link to="/giris">giriş</Link>
          <Link to="/kayit">kaydol</Link>
        </>
      ) : (
        <Menu>
          <Menu.Button>
            <button className="py-2 px-4 rounded-lg text-secondary font-bold flex items-center justify-center gap-x-2">
              <img className="w-6 h-6 rounded" src={user?.profilePicture} alt="" />
              {user?.name}
            </button>
          </Menu.Button>
          <Menu.Items className="absolute top-14 w-[140px] bg-gray-800 rounded font-medium text-center text-secondary py-2 flex flex-col gap-y-2">
            {links.map((link) => (
              <Menu.Item key={link.href} as={Fragment}>
                <Link to={link.href} className="">
                  {link.label}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <button onClick={() => dispatch(authLogout())} className="flex items-center text-red-500 justify-center p-1 gap-x-1 rounded">
                <MdLogout size={18} />
                çıkış
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}
    </>
  );
};

export default ProfileMenu;
