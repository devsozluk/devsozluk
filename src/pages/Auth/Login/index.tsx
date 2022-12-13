import React from "react";
import Input from "@/components/UI/Input";
import Icon from "@/components/UI/Icon";
import Button from "@/components/UI/Button";
import { Formik, Form } from "formik";
import { LoginSchema } from "@/validations/index";
import { LoginFormData } from "@/types/index";

const Login: React.FC = () => {
  const initialValues: LoginFormData = { email: "", password: "" };

  const handleLogin = ({ email, password }: LoginFormData, { setSubmitting }: any) => {
    console.log(email, password);

    setSubmitting(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Formik validationSchema={LoginSchema} initialValues={initialValues} onSubmit={handleLogin}>
        {({ isSubmitting, errors, isValid }) => (
          <>
            <Form className="space-y-8 w-[400px]">
              <div className="space-y-4">
                <Input name="email" errorText={errors.email} placeholder="Email" renderLeftIcon={<Icon icon="user" width={24} height={24} />} />
                <Input name="password" errorText={errors.password} placeholder="Şifre" renderLeftIcon={<Icon icon="lock" width={24} height={24} />} />
              </div>
              <Button loading={isSubmitting} type="submit" disabled={!isValid}>
                Giriş
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;
