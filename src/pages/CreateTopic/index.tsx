import Button from "@/components/Elements/Button";
import { MarkdownEditor } from "@/components/Elements/Markdown";
import Input from "@/components/Form/Input";
import StatusMessage from "@/components/Form/StatusMessage";
import { createTopic } from "@/store/topic/topicThunk";
import { CreateTopicData } from "@/types";
import { useAppDispatch } from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import { Formik } from "formik";
import { useCallback } from "react";
import { Form, useNavigate } from "react-router-dom";

const CreateTopic: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: CreateTopicData = { title: "", content: "" };

  const handleCreate = useCallback(
    async (values: CreateTopicData, formikActions: any) => {
      const { payload } = await dispatch<any>(createTopic({ values, formikActions }));
      if (payload.topic) navigate(`/konu/${payload.topic.slug}`);
    },
    [dispatch]
  );

  return (
    <div className="mt-16 flex h-full items-center justify-center gap-y-10">
      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={handleCreate}>
        {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
          <>
            <Form className="w-[700px] space-y-6">
              {errors.responseMessage && <StatusMessage>{errors.responseMessage}</StatusMessage>}
              <div className="space-y-6">
                <Input name="title" placeholder="Konu başlığını yazınız." label="Konu Başlığı" errorText={errors.title} />
                <MarkdownEditor
                  name="content"
                  errorText={errors.content}
                  label="Konu İçeriği"
                  value={values.content}
                  onChange={(value) => setFieldValue("content", value)}
                />
              </div>
              <Button className="w-full" size="lg" loading={isSubmitting} onClick={() => handleSubmit()} disabled={!isValid}>
                Yayınla
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateTopic;
