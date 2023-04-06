import { ImProfile } from "react-icons/im";
import { MdOutlineBookmarks } from "react-icons/md";

export type Navigation = {
  id: number;
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Navigations(): Navigation[] {
  return [
    {
      id: 0,
      link: "settings",
      icon: <ImProfile />,
      title: "Hesap Ayarları",
    },
    {
      id: 1,
      link: "bookmarks",
      icon: <MdOutlineBookmarks />,
      title: "Kaydedilenler",
    },
  ];
}
