import { useAppSelector } from "@/utils/hooks";
import { AddEntrySchema } from "@/utils/schemas";
import { Formik } from "formik";
import Button from "@/components/Elements/Button";
import { MarkdownEditor } from "@/components/Elements/Markdown";

interface addEntryData {
  content: string;
}

const AddEntryForm = () => {
  const initialValues: addEntryData = { content: "" };
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn)
    return (
      <Formik validationSchema={AddEntrySchema} initialValues={initialValues} onSubmit={() => {}}>
        {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
          <>
            <form className="mt-10 space-y-8 w-full">
              <MarkdownEditor
                name="content"
                errorText={errors.content}
                value={values.content}
                onChange={(value) => setFieldValue("content", value)}
              />
              <Button loading={isSubmitting} click={handleSubmit} disabled={!isValid}>
                Gönder
              </Button>
            </form>
          </>
        )}
      </Formik>
    );

  return <></>;
};

export default AddEntryForm;
