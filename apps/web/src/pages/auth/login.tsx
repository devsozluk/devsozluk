import AuthLayout from "@/components/Layout/AuthLayout";
import { LoginFormData } from "@/types";
import { LoginSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback } from "react";

const Login = () => {
  const initialValues: LoginFormData = { email: "", password: "" };

  const handleSubmit = useCallback(
    async (values: LoginFormData, formikActions: any) => {},
    []
  );

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors }) => (
        <Form className="space-y-6">
          <Input
            name="email"
            autoComplete="off"
            errorMessage={errors.email}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            errorMessage={errors.password}
            placeholder="Şifre"
            autoComplete="current-password"
          />
          <Button className="w-full" loading={isSubmitting} type="submit">
            Giriş
          </Button>
        </Form>
      )}
    </Formik>
  );
};

Login.layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <AuthLayout>
      <AuthLayout.Title>Giriş</AuthLayout.Title>
      <AuthLayout.Description link="/uyelik/kayit" linkText="Kayıt Ol">
        Hesabınız yok mu?
      </AuthLayout.Description>
      {children}
    </AuthLayout>
  );
};

export default Login;
