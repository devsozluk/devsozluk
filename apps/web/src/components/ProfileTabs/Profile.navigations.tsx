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
      title: "Hesap Ayarları",
    },
    {
      id: 1,
      link: "createTopic",
      title: "Konu Oluştur",
    },
  ];
}
