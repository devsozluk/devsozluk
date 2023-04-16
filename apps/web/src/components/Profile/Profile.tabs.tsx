import { IProfile } from "@/types";
import { TabType } from "@devsozluk/ui";
import { ImProfile } from "react-icons/im";
import { MdComment } from "react-icons/md";
import { About } from "./Tabs/About";
import { Entries } from "./Tabs/Entries";
export { About } from "./Tabs/About";

export default function Tabs(profile: IProfile): TabType[] {
  return [
    {
      label: "Profil",
      element: <About {...profile} />,
      icon: <ImProfile />,
    },
    {
      label: "Yorumlar",
      element: <Entries {...profile} />,
      icon: <MdComment />,
    },
  ];
}
