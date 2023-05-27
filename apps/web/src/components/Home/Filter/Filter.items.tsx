import { BsFillCalendarDateFill } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";
import { MdInsertChart } from "react-icons/md";

export interface IFilterItem {
  id: number;
  title: string;
  name: string;
  icon: React.ReactNode;
  filters: {
    order: any;
    options: {
      ascending?: boolean;
      nullsFirst?: boolean;
      foreignTable?: undefined;
    };
  }[];
}

const filterItems: IFilterItem[] = [
  {
    id: 0,
    name: "latest",
    title: "En Son Paylaşılanlar",
    icon: <BsFillCalendarDateFill size={14} />,
    filters: [
      {
        order: "created_at",
        options: {
          ascending: false,
        },
      },
    ],
  },
  {
    id: 2,
    name: "trend",
    title: "En Çok Görüntülenenler",
    icon: <MdInsertChart size={14} />,
    filters: [
      {
        order: "viewsCount",
        options: {
          ascending: false,
        },
      },
      {
        order: "created_at",
        options: {
          ascending: false,
        },
      },
    ],
  },
  {
    id: 3,
    name: "comments",
    title: "En Çok Yorumlananlar",
    icon: <MdInsertChart size={14} />,
    filters: [
      {
        order: "entryCount",
        options: {
          ascending: false,
        },
      },
      {
        order: "created_at",
        options: {
          ascending: false,
        },
      },
    ],
  },
];

export default filterItems;
