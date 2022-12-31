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

  const handleLogout = () => {
    dispatch(authLogout());
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Link to="/uyelik/giris">giriş</Link>
          <Link to="/uyelik/kayit">kaydol</Link>
        </>
      ) : (
        <Menu>
          <Menu.Button>
            <button className="flex items-center justify-center gap-x-2 rounded-lg py-2 px-4 font-bold text-secondary">
              <img className="h-6 w-6 rounded" src={user?.profilePicture} />
              {user?.name}
            </button>
          </Menu.Button>
          <Menu.Items className="absolute top-14 flex w-[140px] flex-col gap-y-2 rounded bg-gray-800 py-2 text-center font-medium text-secondary">
            {links.map((link) => (
              <Menu.Item key={link.href} as={Fragment}>
                <Link to={link.href} className="">
                  {link.label}
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item>
              <button onClick={handleLogout} className="flex items-center justify-center gap-x-1 rounded p-1 text-red-500">
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
