import {
  AiFillCompass,
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";

export type LinkType = "website" | "github" | "twitter" | "linkedin";

export interface Link {
  name: LinkType;
  label: string;
  id?: number;
  icon: React.ReactNode;
}

export const links: Link[] = [
  {
    name: "website",
    label: "Website",
    icon: <AiFillCompass size={18} />,
  },
  {
    name: "github",
    label: "Github",
    icon: <AiFillGithub size={18} />,
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: <AiFillTwitterCircle size={18} />,
  },
  {
    name: "linkedin",
    label: "Linkedin",
    icon: <AiFillLinkedin size={18} />,
  },
];

export default links;
