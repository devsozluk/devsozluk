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
  userId?: string;
}

export interface UpdateProfileData {
  username?: string;
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
  _id: string;
  content: string;
  topic: ITopic;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}

export interface Profile {
  id: string /* primary key */;
  created_at?: string;
  username?: string;
  avatar_url?: string;
  name?: string;
}
