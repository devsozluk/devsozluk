import Button from "@/components/Elements/Button";
import Input from "@/components/Form/Input";
import Spinner from "@/components/Loading";
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
    <div className="w-sm flex h-full flex-col items-center justify-center gap-y-5">
      <div className="relative ">
        <input
          type="file"
          id="changePhoto"
          onChange={onSelectPhoto}
          className={classNames("absolute inset-0 h-full w-full cursor-pointer border-gray-300 opacity-0", { "pointer-events-none": isLoading })}
        />
        <img className={classNames("h-60 w-60 rounded-lg", { "opacity-30 ": isLoading })} src={user?.profilePicture} alt="" />
        <label
          htmlFor="changePhoto"
          className={classNames(
            "absolute bottom-0 left-0 right-0 mx-auto mb-2 flex h-8 w-28 cursor-pointer items-center justify-center gap-x-1 rounded-md bg-tertiary text-sm font-medium text-white opacity-70 transition-all hover:opacity-100",
            { "w-30 pointer-events-none gap-x-0": isLoading }
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
            <Form className="w-[700px] space-y-8">
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
              <Button loading={isSubmitting} onClick={() => handleSubmit()} disabled={!isValid}>
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
