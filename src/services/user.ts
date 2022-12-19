import altogic from "@/libs/altogic";
import { APIError, User } from "altogic";

export const UserChangePhoto = async (userId: string, image: File) => {
  const { data, errors: uploadErrors } = (await altogic.storage.root.upload(image.name, image, {
    isPublic: true,
    onProgress() {},
  })) as { data: { publicPath: string }; errors: APIError };

  if (uploadErrors) throw uploadErrors;
  return UpdateProfile(userId, { profilePicture: data.publicPath });
};

export const UpdateProfile = async (userId: string, data: Partial<User>) => {
  const { data: user, errors } = await altogic.db.model("users").object(userId).update(data);
  if (errors) throw errors;

  return user as User;
};

export default {
  UserChangePhoto,
  UpdateProfile,
};
