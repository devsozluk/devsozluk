import AuthLayout from "@/components/Layout/AuthLayout";
import OnlyGuest from "@/middlewares/OnlyGuest";
import { authLogin } from "@/store/auth/authThunk";
import { LoginFormData } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { LoginSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";

const Login = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const initialValues: LoginFormData = { email: "", password: "" };

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
      {({ errors, values, setFieldValue }) => (
        <Form className="space-y-6">
          <Input
            name="email"
            autoComplete="off"
            errorMessage={errors.email}
            value={values.email}
            onChange={(event) => setFieldValue("email", event.target.value)}
            renderLeftIcon={<RiMailLine size={24} />}
            placeholder="Email"
          />
          <Input
            name="password"
            type="password"
            errorMessage={errors.password}
            value={values.password}
            onChange={(event) => setFieldValue("password", event.target.value)}
            renderLeftIcon={<RiLockPasswordLine size={24} />}
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
    <OnlyGuest>
      <AuthLayout>
        <AuthLayout.Title>Giriş</AuthLayout.Title>
        <AuthLayout.Description link="/auth/register" linkText="Kayıt Ol">
          Hesabınız yok mu?
        </AuthLayout.Description>
        {page}
      </AuthLayout>
    </OnlyGuest>
  );
};

export default Login;
