import { useUpdateProfileMutation } from "@/services/user";
import { UpdateProfileData } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import positions from "@/utils/positions";
import { UpdateProfileSchema } from "@/utils/schemas";
import { Button, Select, TextArea } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "../layout";
import ProfileLinks from "./links";

const Profile = () => {
  const { profile, user } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading, status, data }] =
    useUpdateProfileMutation();
  const initialValues: UpdateProfileData = {
    position: profile?.position || "",
    biography: profile?.biography || "",
  };

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Profiliniz güncellendi.");
    }
  }, [status]);

  const handleUpdateProfile = (values: UpdateProfileData) => {
    updateProfile({
      ...values,
      userId: user?.id as string,
    });
  };

  return (
    <div className="w-sm flex h-full flex-col divide-y divide-opacity-30 divide-gray-700">
      <Formik
        validationSchema={UpdateProfileSchema}
        initialValues={initialValues}
        onSubmit={handleUpdateProfile}
      >
        {({ values, errors, handleSubmit, setFieldValue }) => (
          <Form className="w-[500px] space-y-4 pb-10">
            <div>
              <h3 className="text-lg font-semibold">Profil</h3>
              <p className="text-sm text-gray-400">
                Profil bilgilerinizi düzenleyin.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-y-5">
                <Select
                  label="Pozisyon"
                  placeholder="Bir pozisyon seçin."
                  options={positions}
                  value={values.position}
                  onChange={(value) => setFieldValue("position", value)}
                />
                <TextArea
                  label="Biyografi"
                  rows={4}
                  value={values.biography}
                  onChange={(event) =>
                    setFieldValue("biography", event.target.value)
                  }
                  errorMessage={errors.biography}
                />
              </div>
            </div>
            <Button
              size="md"
              className="w-32"
              type="submit"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => handleSubmit()}
            >
              Kaydet
            </Button>
          </Form>
        )}
      </Formik>
      <Profile.Links />
    </div>
  );
};

Profile.Links = ProfileLinks;

Profile.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default Profile;
