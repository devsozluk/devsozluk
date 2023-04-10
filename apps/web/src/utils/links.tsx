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
  icon: React.FC<{ className?: string }>;
}

export const links: Link[] = [
  {
    name: "website",
    label: "Website",
    icon: AiFillCompass,
  },
  {
    name: "github",
    label: "Github",
    icon: AiFillGithub,
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: AiFillTwitterCircle,
  },
  {
    name: "linkedin",
    label: "Linkedin",
    icon: AiFillLinkedin,
  },
];

export default links;
