import {
  useUpdatePhotoMutation,
  useUpdateUserProfileMutation,
} from "@/services/user";
import { setUser } from "@/store/auth/authSlice";
import { UpdateAccountData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import {
  getErrorFromPayload,
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks";
import { UpdateAccountSchema } from "@/utils/schemas";
import { Button, Input, Spinner } from "@devsozluk/ui";
import classNames from "classnames";
import { Form, Formik } from "formik";
import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiImageEditFill } from "react-icons/ri";
import { default as DashboardLayout } from "./layout";
import { NextSeo } from "next-seo";

const Settings = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [updateAccount, { isLoading, status }] = useUpdateUserProfileMutation();
  const initialValues: UpdateAccountData = {
    username: user?.user_metadata.user_name,
    name: user?.user_metadata.name,
  };

  const handleUpdateProfile = (values: UpdateAccountData) => {
    updateAccount({ ...values, userId: user?.id as string });
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Hesap bilgileriniz güncellendi.");
    }
  }, [status]);

  return (
    <DashboardLayout>
      <NextSeo title="Hesap Ayarları" />
      <div className="flex flex-col h-full w-sm gap-y-5">
        <div>
          <h3 className="text-lg font-semibold">Hesap</h3>
          <p className="text-sm text-gray-400">
            Hesap bilgilerinizi düzenleyin.
          </p>
        </div>
        <Settings.ChangePhoto />
        <Formik
          validationSchema={UpdateAccountSchema}
          initialValues={initialValues}
          onSubmit={handleUpdateProfile}
        >
          {({ values, errors, setFieldValue, handleSubmit }) => (
            <Form className="w-[700px] space-y-4">
              <div className="space-y-4">
                <div className="flex gap-x-6">
                  <Input
                    name="email"
                    value={user?.email}
                    disabled
                    label="Email"
                  />
                  <Input
                    name="name"
                    value={values.username}
                    onChange={(event) =>
                      setFieldValue("username", event.target.value)
                    }
                    label="Kullanıcı Adı"
                  />
                </div>
                <div className="flex gap-x-6">
                  <Input
                    name="Ad"
                    value={values.name}
                    onChange={(event) =>
                      setFieldValue("name", event.target.value)
                    }
                    label="Ad"
                  />
                </div>
              </div>
              <Button
                loading={isLoading}
                disabled={isLoading}
                size="md"
                className="w-32"
                onClick={() => handleSubmit()}
              >
                Kaydet
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </DashboardLayout>
  );
};

Settings.ChangePhoto = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const [updateAvatar, { data, isLoading, status, error }] =
    useUpdatePhotoMutation();

  const onSelectPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const avatarFile = event.target.files![0];
    if (!avatarFile) return;

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
    <div className="flex gap-x-4">
      <div className="relative w-24 group">
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
          className={classNames("h-24 w-24 rounded-full", {
            "opacity-30 ": isLoading,
          })}
          src={user?.user_metadata.avatar_url}
          alt=""
        />
        <label
          htmlFor="changePhoto"
          className={classNames(
            "absolute inset-0 hidden group-hover:flex items-center justify-center bg-gray-600/20 rounded-full cursor-pointer",
            { "w-30 pointer-events-none gap-x-0 !flex": isLoading }
          )}
        >
          {isLoading ? (
            <Spinner className="mr-1" />
          ) : (
            <>
              <RiImageEditFill size={24} />
            </>
          )}
        </label>
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="text-white text-medium">Profil Resmi Ayarla</h4>
        <p className="text-sm text-gray-400">
          Bir fotoğraf yükleyin ve profil resminizi değiştirin
        </p>
      </div>
    </div>
  );
};

export default Settings;
