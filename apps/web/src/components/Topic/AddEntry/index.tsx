import CEditor from "@/components/Editor";
import { useAddEntryMutation } from "@/services/topic";
import { AddEntryData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { getErrorFromPayload, useAppSelector } from "@/utils/hooks";
import { AddEntrySchema } from "@/utils/schemas";
import { Button } from "@devsozluk/ui";
import { Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const TopicAddEntry = () => {
  const initialValues: AddEntryData = { content: "" };
  const user = useAppSelector((state) => state.auth.user);
  const { topic } = useAppSelector((state) => state.topic);

  const [addEntry, { status, isLoading, error }] = useAddEntryMutation();

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Başarıyla konuya mesaj gönderildi.");
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  const handleSubmit = (values: AddEntryData, formikActions: any) => {
    addEntry({
      content: values.content,
      topic: topic.id,
      author: user?.id as string,
    });
    formikActions.resetForm();
  };

  return (
    <Formik
      validationSchema={AddEntrySchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, values, setFieldValue, handleSubmit }) => (
        <div>
          <CEditor
            value={values.content}
            onUpdate={(value) => setFieldValue("content", value)}
            errorMessage={errors.content}
            placeholder="İçerik yazınız."
          >
            <CEditor.Actions>
              <Button
                loading={isLoading}
                onClick={() => handleSubmit()}
                size="sm"
                className="ml-auto"
              >
                Gönder
              </Button>
            </CEditor.Actions>
          </CEditor>
        </div>
      )}
    </Formik>
  );
};

export default TopicAddEntry;
