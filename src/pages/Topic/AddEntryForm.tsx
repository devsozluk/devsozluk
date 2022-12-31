import Button from "@/components/Elements/Button";
import { MarkdownEditor } from "@/components/Elements/Markdown";
import { useAppSelector } from "@/utils/hooks";
import { AddEntrySchema } from "@/utils/schemas";
import { Formik } from "formik";
import { Form } from "react-router-dom";

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
            <Form className="mt-10 w-full space-y-8">
              <MarkdownEditor
                name="content"
                errorText={errors.content}
                value={values.content}
                onChange={(value) => setFieldValue("content", value)}
              />
              <Button className="w-full" type="button" loading={isSubmitting} onClick={() => handleSubmit()} disabled={!isValid}>
                Gönder
              </Button>
            </Form>
          </>
        )}
      </Formik>
    );

  return <></>;
};

export default AddEntryForm;
