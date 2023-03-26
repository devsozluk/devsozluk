import { useAddEntryMutation } from "@/services/topic";
import { AddEntryData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { getErrorFromPayload, useAppSelector } from "@/utils/hooks";
import { AddEntrySchema } from "@/utils/schemas";
import { Button, TextArea } from "@devsozluk/ui";
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
        <TextArea
          value={values.content}
          errorMessage={errors.content}
          onChange={(event) => setFieldValue("content", event.target.value)}
          placeholder="Göndermek istediğin mesajı yaz."
          rows={4}
        >
          <TextArea.Actions>
            <Button
              loading={isLoading}
              onClick={() => handleSubmit()}
              className="ml-auto"
              size="sm"
            >
              Gönder
            </Button>
          </TextArea.Actions>
        </TextArea>
      )}
    </Formik>
  );
};

export default TopicAddEntry;
