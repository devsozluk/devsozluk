import Button from "@/components/Elements/Button";
import Spinner from "@/components/Elements/Spinner";
import Input from "@/components/Form/Input";
import type { UpdateProfileData } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { ChangeEvent, useState } from "react";
import { RiImageEditFill } from "react-icons/ri";

const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: UpdateProfileData = { name: user?.name };

  const onSelectPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    // if (!e.target.files) return;
    // const [file] = e.target.files;
    // setIsLoading(true);
    // const updatedUser = await userService.UserChangePhoto(user?._id as string, file);
    // if (updatedUser) {
    //   setUser(updatedUser);
    //   toast.success("Profil fotoğrafınız başarılı bir şekilde güncellendi.");
    // }
    // setIsLoading(false);
  };

  const updateProfile = () => {};

  return (
    <div className="h-full w-sm flex flex-col gap-y-5 items-center justify-center">
      <div className="relative ">
        <input
          type="file"
          id="changePhoto"
          onChange={onSelectPhoto}
          className={classNames("absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300", { "pointer-events-none": isLoading })}
        />
        <img className={classNames("w-60 h-60 rounded-lg", { "opacity-30 ": isLoading })} src={user?.profilePicture} alt="" />
        <label
          htmlFor="changePhoto"
          className={classNames(
            "bg-tertiary cursor-pointer mx-auto w-28 h-8 absolute bottom-0 left-0 right-0 mb-2 opacity-70 rounded-md flex items-center justify-center gap-x-1 text-white font-medium text-sm hover:opacity-100 transition-all",
            { "w-30 gap-x-0 pointer-events-none": isLoading }
          )}
        >
          {isLoading ? (
            <Spinner className="mr-1" />
          ) : (
            <>
              <RiImageEditFill size={20} />
              değiştir
            </>
          )}
        </label>
      </div>
      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={updateProfile}>
        {({ isSubmitting, errors, isValid, handleSubmit }) => (
          <>
            <Form className="space-y-8 w-[700px]">
              <div className="space-y-4">
                <Input name="name" placeholder="Değiştirmek istediğiniz kullanıcı adını yazınız." label="Kullanıcı Adı" errorText={errors.name} />
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
