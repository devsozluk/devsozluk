import React from "react";
import { ErrorMessage, Formik } from "formik";
import { Form } from "react-router-dom";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

import { CreateTopicSchema } from "@/validations";
import { CreateTopicData } from "@/types";

import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";

const CreateTopic: React.FC = () => {
  const initialValues: CreateTopicData = { title: "", content: "" };

  const handleCreate = async ({ title, content }: CreateTopicData, { setSubmitting }: any) => {
    console.log(title, content);

    setSubmitting(false);
    return;
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={handleCreate}>
        {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
          <>
            <Form className="space-y-8 w-[700px]">
              <div className="space-y-4">
                <Input name="title" placeholder="Konu başlığını yazınız." label="Konu Başlığı" errorText={errors.title} />
                <div>
                  <label className="mb-1">Konu İçeriği</label>
                  <MDEditor
                    height={300}
                    className={classNames("bg-transparent rounded-lg border-tertiary border-[1px]", { "border-red-500": errors.content })}
                    value={values.content}
                    onChange={(value) => setFieldValue("content", value)}
                    preview="edit"
                  />
                  {errors.content && <p className="pt-1 text-sm text-red-500">{errors.content}</p>}
                </div>
              </div>
              <Button loading={isSubmitting} click={handleSubmit} disabled={!isValid}>
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
