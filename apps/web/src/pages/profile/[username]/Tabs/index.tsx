import { TabType } from "@devsozluk/ui";
import { ImProfile } from "react-icons/im";
import { MdComment, MdTopic } from "react-icons/md";
import { About } from "./About";
import { Entries } from "./Entries";
import { Topics } from "./Topics";
export { About } from "./About";

const tabs: TabType[] = [
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

export default tabs;
