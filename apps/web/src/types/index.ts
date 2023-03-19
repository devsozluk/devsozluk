export interface LoginFormData {
  email: string;
  password: string;
  responseMessage?: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  responseMessage?: string;
}

export interface CreateTopicData {
  title: string;
  content: string;
  responseMessage?: string;
}

export interface UpdateProfileData {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
}

export interface ITopic {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  entryCount: number;
  isPublic: boolean;
}

export interface IEntry {
  _id: string;
  content: string;
  topic: ITopic;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
}
