import { CreateTopicData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import {
  getErrorFromPayload,
  useAppDispatch,
  useAppSelector,
} from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import { Button, Input, TextArea } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "./layout";
import { useRouter } from "next/router";
import { useAddTopicMutation } from "@/services/topic";

const CreateTopic = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: CreateTopicData = { title: "", content: "" };
  const [handleAddTopic, { isLoading, status, data, error }] =
    useAddTopicMutation();

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Konu oluşturuldu, yönlendiriliyorsunuz.");
      router.push(`/topic/${data.slug}`);
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  const handleCreate = useCallback(async (values: CreateTopicData) => {
    handleAddTopic({ ...values, userId: user?.id });
  }, []);

  return (
    <div className="w-[600px]">
      <Formik
        validationSchema={CreateTopicSchema}
        initialValues={initialValues}
        onSubmit={handleCreate}
        validateOnBlur={false}
      >
        {({ errors, setFieldValue, values, handleSubmit }) => (
          <>
            <Form className="px-4">
              <div className="space-y-6">
                <Input
                  name="title"
                  placeholder="Konu başlığını yazınız."
                  label="Konu Başlığı"
                  errorMessage={errors.title}
                  value={values.title}
                  onChange={(event) =>
                    setFieldValue("title", event.target.value)
                  }
                />
                <TextArea
                  name="content"
                  placeholder="Konu içeriğini yazınız."
                  label="Konu İçeriği"
                  rows={6}
                  value={values.content}
                  onChange={(event) =>
                    setFieldValue("content", event.target.value)
                  }
                  errorMessage={errors.content}
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <Button size="sm" loading={isLoading}>
                  Yayınla
                </Button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

CreateTopic.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;

export default CreateTopic;
