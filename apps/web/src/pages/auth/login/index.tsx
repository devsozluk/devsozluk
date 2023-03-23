import AuthLayout from "../layout";
import OnlyGuest from "@/middlewares/OnlyGuest";
import { useAuthLoginMutation } from "@/services/auth";
import { LoginFormData } from "@/types";
import getErrorTranslation from "@/utils/errors";
import { getErrorFromPayload, useAppDispatch } from "@/utils/hooks";
import { LoginSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import { useRouter } from "next/router";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const initialValues: LoginFormData = { email: "", password: "" };
  const [handleAuthLogin, { isLoading, status, data, error, isError }] =
    useAuthLoginMutation({});

  useEffect(() => {
    if (status === "fulfilled") {
      toast.success("Giriş başarılı, yönlendiriliyorsunuz.");
      router.push("/")
    } else if (status === "rejected") {
      const errorMessage = getErrorFromPayload(error);
      toast.error(getErrorTranslation(errorMessage));
    }
  }, [status]);

  const handleSubmit = useCallback(
    async (values: LoginFormData, formikActions: any) => {
      handleAuthLogin(values);
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
