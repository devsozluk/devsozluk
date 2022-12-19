import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useAuthContext } from "@/context/AuthContext";
import altogic from "@/libs/altogic";
import type { UpdateProfileData } from "@/types";
import { CreateTopicSchema } from "@/validations";
import { Form, Formik } from "formik";
import { ChangeEvent } from "react";
import { RiImageEditFill } from "react-icons/ri";

const Profile = () => {
  const { user } = useAuthContext();
  const initialValues: UpdateProfileData = { name: user?.name };

  const onSelectPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const [file] = e.target.files;

    const { data, errors: uploadErrors } = await altogic.storage.root.upload(file.name, file, {
      isPublic: true,
      onProgress() {},
    });

    await altogic.db.model("users").object(user?._id).update({ profilePicture: data.publicPath });

    console.log(data);
  };

  const updateProfile = () => {};

  return (
    <div className="h-full w-sm flex flex-col gap-y-5 items-center justify-center">
      <div className="relative">
        <input
          type="file"
          id="changePhoto"
          onChange={onSelectPhoto}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300"
        />
        <img className="w-60 h-60 rounded-lg" src={user?.profilePicture} alt="" />
        <label
          htmlFor="changePhoto"
          className="bg-tertiary cursor-pointer mx-auto w-28 h-8 absolute bottom-0 left-0 right-0 mb-2 opacity-70 rounded-md flex items-center justify-center gap-x-1 text-white font-medium text-sm hover:opacity-100 transition-all"
        >
          <RiImageEditFill size={20} />
          değiştir
        </label>
      </div>
      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={updateProfile}>
        {({ isSubmitting, errors, isValid, handleSubmit }) => (
          <>
            <Form className="space-y-8 w-[700px]">
              <div className="space-y-4">
                <Input name="username" placeholder="Değiştirmek istediğiniz kullanıcı adını yazınız." label="Kullanıcı Adı" errorText={errors.name} />
                <Input name="password" placeholder="Değiştirmek istediğiniz şifreyi yazın." label="Şifre" errorText={errors.name} />
                <Input
                  name="changePassword"
                  placeholder="Değiştirmek istediğiniz şifreyi tekrar yazın."
                  label="Tekrar Şifre"
                  errorText={errors.name}
                />
              </div>
              <Button loading={isSubmitting} click={handleSubmit} disabled={!isValid}>
                Güncelle
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
