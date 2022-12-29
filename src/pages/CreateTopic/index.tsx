import Button from "@/components/Elements/Button";
import { MarkdownEditor } from "@/components/Elements/Markdown";
import Input from "@/components/Form/Input";
import { CreateTopicData } from "@/types";
import { useAppSelector } from "@/utils/hooks";
import { CreateTopicSchema } from "@/utils/schemas";
import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";
import { Formik } from "formik";
import React from "react";
import { Form, useNavigate } from "react-router-dom";

const CreateTopic: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const initialValues: CreateTopicData = { title: "", content: "" };

  const handleCreate = async ({ title, content }: CreateTopicData, { setSubmitting }: any) => {
    // const { data, errors } = await TopicService.CreateTopic(user?._id as string, { title, content });
    // if (data) {
    //   toast.success("konu oluşturuldu yönlendiriliyorsunuz...");
    //   navigate("/konu/" + data.slug);
    // } else {
    //   if (errors?.items[0].code === "not_unique" && errors.items[0].details?.field === "title") return toast.error("bu başlıkta bir konu var zaten.");
    //   toast.error(errors?.items[0].message);
    // }
    // setSubmitting(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Formik validationSchema={CreateTopicSchema} initialValues={initialValues} onSubmit={handleCreate}>
        {({ isSubmitting, errors, isValid, setFieldValue, values, handleSubmit }) => (
          <>
            <Form className="space-y-8 w-[700px]">
              <div className="space-y-4">
                <Input name="title" placeholder="Konu başlığını yazınız." label="Konu Başlığı" errorText={errors.title} />
                <MarkdownEditor
                  name="content"
                  errorText={errors.content}
                  label="Konu İçeriği"
                  value={values.content}
                  onChange={(value) => setFieldValue("content", value)}
                />
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
