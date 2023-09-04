import { HiUser } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { MdPassword } from "react-icons/md";
import { RiBookMarkFill } from "react-icons/ri";

export type Navigation = {
  id: number;
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export interface Navigations {
  id: number;
  title: string;
  children: Navigation[];
}

export default function Navigations(): Navigations[] {
  return [
    {
      id: 0,
      title: "Kullanıcı",
      children: [
        {
          id: 0,
          link: "account",
          icon: <HiUser size={16} />,
          title: "Hesap",
        },
        {
          id: 1,
          link: "profile",
          icon: <ImProfile size={16} />,
          title: "Profil",
        },
        {
          id: 2,
          link: "change-password",
          icon: <MdPassword size={16} />,
          title: "Şifre Değiştir",
          disabled: true,
        },
      ],
    },
    {
      id: 1,
      title: "Diğer",
      children: [
        {
          id: 0,
          link: "bookmarks",
          icon: <RiBookMarkFill size={16} />,
          title: "Kaydedilenler",
          disabled: true,
        },
      ],
    },
  ];
}
