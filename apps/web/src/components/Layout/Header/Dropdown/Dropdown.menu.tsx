import { useLogoutMutation } from "@/services/auth";
import { BsBookmarks } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { TbReport } from "react-icons/tb";

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
      id: 2,
      link: "https://github.com/devsozluk/website/issues/new?assignees=octocat&labels=bug,triage&template=bug_report.yaml&title=%5BBug%5D:+",
      icon: <TbReport />,
      title: "Hata Bildir",
    },
    {
      id: 3,
      className: "!text-red-400",
      icon: <FiLogOut />,
      title: "Çıkış Yap",
      onClick: handleLogout,
    },
  ];
}
