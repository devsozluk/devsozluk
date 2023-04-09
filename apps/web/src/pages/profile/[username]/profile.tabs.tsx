import { TabType } from "@devsozluk/ui";
import { ImProfile } from "react-icons/im";
import { MdComment, MdTopic } from "react-icons/md";
import { About } from "./Tabs/About";
import { Entries } from "./Tabs/Entries";
import { Topics } from "./Tabs/Topics";
export { About } from "./Tabs/About";

export default function Tabs(): TabType[] {
  return [
    {
      label: "Profil",
      element: <About />,
      icon: <ImProfile />,
    },
    {
      label: "Konular",
      element: <Topics />,
      icon: <MdTopic />,
    },
    {
      label: "Yorumlar",
      element: <Entries />,
      icon: <MdComment />,
    },
  ];
}
