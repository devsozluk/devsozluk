import { useLogoutMutation } from "@/services/auth";

export type IMenu = {
  id: number;
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
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
      link: "/dashboard/settings",
    },
    {
      id: 1,
      link: "/dashboard/createTopic",
      title: "Konu Oluştur",
    },
    {
      id: 3,
      title: "Çıkış",
      onClick: handleLogout,
    },
  ];
}
