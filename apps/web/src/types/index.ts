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

export interface AddEntryData {
  content: string;
  topic?: number;
  author?: string;
}

export interface UpdateProfileData {
  name?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface ITopic {
  id: number;
  created_at: string;
  title?: string;
  author: Profile;
  slug: string;
  entryCount?: number;
}

export interface IEntry {
  id: string;
  content: string;
  author: Profile;
  topic: ITopic;
  created_at: Date;
  isPublic: boolean;
}

export interface Profile {
  id: string /* primary key */;
  created_at?: string;
  username?: string;
  avatar_url: string;
  name?: string;
}
