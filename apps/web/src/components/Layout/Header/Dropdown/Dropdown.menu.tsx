import { logout } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";

export type IMenu = {
  id: number;
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Dropdown(): IMenu[] {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
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
