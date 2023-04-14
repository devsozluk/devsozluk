import { useLogoutMutation } from "@/services/auth";
import { BsBookmarks } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

export type IMenu = {
  id: number;
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Dropdown(): IMenu[] {
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout("");
  };

  return [
    {
      id: 0,
      title: "Hesap Ayarları",
      icon: <CgProfile />,
      link: "/dashboard/account",
    },
    {
      id: 1,
      link: "/dashboard/bookmarks",
      icon: <BsBookmarks />,
      title: "Kaydedilenler",
    },
    {
      id: 3,
      className: "border-t border-gray-700 border-opacity-70",
      icon: <FiLogOut />,
      title: "Çıkış Yap",
      onClick: handleLogout,
    },
  ];
}
