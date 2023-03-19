import AuthLayout from "@/components/Layout/AuthLayout";
import OnlyGuard from "@/middlewares/OnlyGuard";
import { authLogin } from "@/store/auth/authThunk";
import { LoginFormData } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { LoginSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const initialValues: LoginFormData = {
    email: "deneme@gmail.com",
    password: "deneme",
  };

  const handleSubmit = useCallback(
    async (values: LoginFormData, formikActions: any) => {
      dispatch(authLogin({ values, formikActions }));
    },
    [dispatch]
  );

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ errors, setFieldValue }) => (
        <Form className="space-y-6">
          <Input
            name="email"
            autoComplete="off"
            errorMessage={errors.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            errorMessage={errors.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            placeholder="Şifre"
            autoComplete="current-password"
          />
          <Button className="w-full" loading={isLoading} type="submit">
            Giriş
          </Button>
        </Form>
      )}
    </Formik>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return (
    <OnlyGuard>
      <AuthLayout>
        <AuthLayout.Title>Giriş</AuthLayout.Title>
        <AuthLayout.Description link="/auth/register" linkText="Kayıt Ol">
          Hesabınız yok mu?
        </AuthLayout.Description>
        {page}
      </AuthLayout>
    </OnlyGuard>
  );
};

export default Login;
