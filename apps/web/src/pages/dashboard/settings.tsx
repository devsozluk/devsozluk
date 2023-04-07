import { useUpdatePhotoMutation } from "@/services/user";
import { setUser } from "@/store/auth/authSlice";
import { UpdateProfileData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import {
  getErrorFromPayload,
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks";
import { UpdateProfileSchema } from "@/utils/schemas";
import { Button, Input, Spinner } from "@devsozluk/ui";
import classNames from "classnames";
import { Form, Formik } from "formik";
import Image from "next/image";
import { ChangeEvent, Fragment, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiImageEditFill } from "react-icons/ri";
import Layout from "./layout";

const Settings = () => {
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: UpdateProfileData = {
    name: user?.user_metadata.full_name,
  };

  const handleUpdateProfile = () => { };

  return (
    <div className="w-sm flex h-full flex-col items-center justify-center gap-y-5">
      <Settings.ChangePhoto />
      <Formik
        validationSchema={UpdateProfileSchema}
        initialValues={initialValues}
        onSubmit={handleUpdateProfile}
      >
        {({ values, errors, handleSubmit }) => (
          <Form className="w-[700px] space-y-4">
            <div className="space-y-4">
              <Input
                name="name"
                value={values.name}
                label="Kullanıcı Adı"
              />
              <div className="flex gap-x-6">
                <Input
                  type="password"
                  name="password"
                  placeholder="Eski Şifre"
                  label="Şifre"
                />
                <Input
                  type="password"
                  name="changePassword"
                  placeholder="Yeni Şifre"
                  label="Tekrar Şifre"
                />
              </div>
            </div>
            <Button disabled size="md" className="w-full" onClick={() => handleSubmit()}>
              Kaydet
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

Settings.ChangePhoto = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [updateAvatar, { data, isLoading, status, error }] =
    useUpdatePhotoMutation();

  const onSelectPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = event.target.files![0];

    await updateAvatar({
      avatarFile,
    });
  };

  useEffect(() => {
    if (status === "fulfilled") {
      dispatch(setUser(data?.user));
      toast.success("Profil fotoğrafınız güncellendi.");
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  return (
    <div className="relative ">
      <input
        type="file"
        id="changePhoto"
        onChange={onSelectPhoto}
        className={classNames(
          "absolute inset-0 h-full w-full cursor-pointer border-gray-300 opacity-0",
          { "pointer-events-none": isLoading }
        )}
      />
      <Image
        width={200}
        height={200}
        className={classNames("h-40 w-40 rounded-lg", {
          "opacity-30 ": isLoading,
        })}
        src={user?.user_metadata.avatar_url}
        alt=""
      />
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
          <Fragment>
            <RiImageEditFill size={20} />
            değiştir
          </Fragment>
        )}
      </label>
    </div>
  );
};

Settings.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Settings;
