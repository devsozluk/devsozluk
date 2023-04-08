import { UpdateProfileData } from "@/types";
import {
  useAppSelector
} from "@/utils/hooks";
import { UpdateProfileSchema } from "@/utils/schemas";
import { Button, TextArea } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import Layout from "../layout";
import ProfileLinks from "./profile.links";

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: UpdateProfileData = {
    bio: "",
  };

  const handleUpdateProfile = () => { };

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
              <p className="text-sm text-gray-400">Profil bilgilerinizi düzenleyin.</p>
            </div>
            <div className="space-y-4">
              <div className="">
                <TextArea label="Biyoğrafi" rows={4} value={values.bio} onChange={(event) => setFieldValue("bio", event.target.value)} />
              </div>
            </div>
            <Button size="md" className="w-32" onClick={() => handleSubmit()}>
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
