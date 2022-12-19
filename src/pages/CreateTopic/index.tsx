import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useAuthContext } from "@/context/AuthContext";
import TopicService from "@/services/topic";
import { CreateTopicData } from "@/types";
import { CreateTopicSchema } from "@/validations";
import MDEditor from "@uiw/react-md-editor";
import classNames from "classnames";
import { Formik } from "formik";
import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateTopic: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const initialValues: CreateTopicData = { title: "", content: "" };

  const handleCreate = async ({ title, content }: CreateTopicData, { setSubmitting }: any) => {
    const { data, errors } = await TopicService.CreateTopic(user?._id as string, { title, content });

    if (data) {
      toast.success("konu oluşturuldu yönlendiriliyorsunuz...");
      navigate("/konu/" + data.slug);
    } else {
      if (errors?.items[0].code === "not_unique" && errors.items[0].details?.field === "title") return toast.error("bu başlıkta bir konu var zaten.");
      toast.error(errors?.items[0].message);
    }
    setSubmitting(false);
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
