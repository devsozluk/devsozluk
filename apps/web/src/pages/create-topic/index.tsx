import Editor from "@/components/Editor";
import MainLayout from "@/components/Layout/MainLayout";
import { useAddTopicMutation } from "@/services/topic";
import { CreateTopicData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { getErrorFromPayload, useAppSelector } from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

const CreateTopic = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const initialValues: CreateTopicData = { title: "", content: "" };
  const [handleAddTopic, { isLoading, status, data, error }] =
    useAddTopicMutation();

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Konu oluşturuldu, yönlendiriliyorsunuz.");
      router.push(`/topic/${data.topic.slug}`);
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  const handleCreate = useCallback(async (values: CreateTopicData) => {
    handleAddTopic({ ...values, author: user?.id });
  }, []);

  return (
    <MainLayout>
      <NextSeo title="Konu Oluştur" />
      <div className="w-[600px]">
        <Formik
          validationSchema={CreateTopicSchema}
          initialValues={initialValues}
          onSubmit={handleCreate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, setFieldValue, values, handleSubmit }) => (
            <>
              <Form className="px-4" onSubmit={() => {}}>
                <div className="flex flex-col space-y-4">
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
                  <Editor
                    onUpdate={(value) => setFieldValue("content", value)}
                    label="İçerik"
                    placeholder="İçerik yazınız."
                    errorMessage={errors.content}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={() => handleSubmit()}
                    size="sm"
                    loading={isLoading}
                  >
                    Yayınla
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

export default CreateTopic;
