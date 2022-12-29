import { useAppSelector } from "@/utils/hooks";
import { AddEntrySchema } from "@/utils/schemas";
import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";
import { Formik } from "formik";
import Button from "@/components/Elements/Button";

interface addEntryData {
  content: string;
}

const AddEntryForm = () => {
  const initialValues: addEntryData = { content: "" };
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  if (isLoggedIn)
    return (
      <Formik validationSchema={AddEntrySchema} initialValues={initialValues}>
        {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
          <>
            <form className="mt-10 space-y-8 w-full">
              <div>
                <MDEditor
                  height={200}
                  className={classNames("bg-transparent rounded-lg border-tertiary border-[1px]", { "border-red-500": errors.content })}
                  value={values.content}
                  onChange={(value) => setFieldValue("content", value)}
                  preview="edit"
                />
                {errors.content && <p className="pt-1 text-sm text-red-500">{errors.content}</p>}
              </div>
              <Button loading={isSubmitting} click={handleSubmit} disabled={!isValid}>
                Gönder
              </Button>
            </form>
          </>
        )}
      </Formik>
    );
};

export default AddEntryForm;
