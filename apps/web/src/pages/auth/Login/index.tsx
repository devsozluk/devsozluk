/* eslint-disable react/display-name */
import { Alert, Input, Button } from "@devsozluk/ui";
import AuthLayout from "@/components/Layout/AuthLayout";
import { authLogin } from "@/store/auth/authThunk";
import { LoginFormData } from "@/types/index";
import { useAppDispatch } from "@/utils/hooks";
import { LoginSchema } from "@/utils/schemas";
import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";

const Login: React.FC = () => {
  const initialValues: LoginFormData = { email: "", password: "" };

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (values: LoginFormData, formikActions: any) => {
      console.log("asddsa");
    },
    []
  );

  return (
    <AuthLayout>
      <AuthLayout.Title>Giriş yap</AuthLayout.Title>
      <AuthLayout.Description link="/uyelik/kayit" linkText="Kayıt Ol">
        Hesabınız yok mu?
      </AuthLayout.Description>
      <Formik
        validationSchema={LoginSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors }) => (
          <Form className="space-y-6">
            {errors.responseMessage && (
              <Alert variant="danger">{errors.responseMessage}</Alert>
            )}
            <Input
              name="email"
              autoComplete="off"
              errorMessage={errors.email}
              placeholder="Email"
              renderLeftIcon={<RiMailLine size={24} />}
            />
            <Input
              name="password"
              type="password"
              errorMessage={errors.password}
              placeholder="Şifre"
              autoComplete="current-password"
              renderLeftIcon={<RiLockPasswordLine size={24} />}
            />
            <Button className="w-full" loading={isSubmitting} type="submit">
              Giriş
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
