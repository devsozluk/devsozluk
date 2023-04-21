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
  };
}

export default [
  {
    id: 0,
    name: "latest",
    title: "Güncel",
    icon: <BsFillCalendarDateFill size={14} />,
    filters: {
      order: "created_at",
      options: {
        ascending: false,
      },
    },
  },
  {
    id: 1,
    name: "popular",
    title: "Popüler",
    icon: <IoNewspaper size={14} />,
    filters: {
      order: "viewsCount",
      options: {
        ascending: false,
      },
    },
  },
  {
    id: 2,
    name: "trend",
    title: "Trend",
    icon: <MdInsertChart size={14} />,
    filters: {
      order: "entryCount",
      options: {
        ascending: false,
      },
    },
  },
] as IFilterItem[];
