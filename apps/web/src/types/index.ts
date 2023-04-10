import { Link } from "@/utils/links";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface CreateTopicData {
  title: string;
  content: string;
  author?: string;
}

export interface UpdateVoteBody {
  entry: number;
  author: string;
  type?: "up" | "down";
}

export interface AddEntryData {
  content: string;
  topic?: number;
  author?: string;
}

export interface UpdateAccountData {
  username: string;
  name: string;
}

export interface UpdateProfileData {
  biography: string;
}

export interface ITopic {
  id: number;
  created_at: string;
  title?: string;
  author: IProfile;
  slug: string;
  entryCount?: number;
  viewsCount?: number;
}

export interface IEntry {
  id: number;
  content: string;
  author: IProfile;
  topic: ITopic;
  created_at: Date;
  isPublic: boolean;
  upvotes: number;
  downvotes: number;
}

export interface IVote {
  entry: number;
  author: number;
  upvoted: boolean;
  downvoted: boolean;
}

export interface IProfile {
  id: string /* primary key */;
  created_at?: string;
  username?: string;
  avatar_url: string;
  name?: string;
  biography: string;
  links: Link[];
}
