import { ImProfile } from "react-icons/im"
import { TfiWrite } from "react-icons/tfi"

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
      link: "createTopic",
      icon: <TfiWrite />,
      title: "Konu Oluştur",
    },
  ];
}
