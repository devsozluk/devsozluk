import AuthLayout from "@/components/Layout/AuthLayout";
import { authLogin, authRegister } from "@/store/auth/authThunk";
import { LoginFormData, RegisterFormData } from "@/types";
import { useAppDispatch } from "@/utils/hooks";
import { RegisterSchema } from "@/utils/schemas";
import { Button, Input } from "@devsozluk/ui";
import { Form, Formik } from "formik";
import { useCallback } from "react";

const Register = () => {
  const dispatch = useAppDispatch();
  const initialValues: RegisterFormData = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = useCallback(
    async (values: RegisterFormData, formikActions: any) => {
      dispatch(authRegister({ values, formikActions }));
    },
    [dispatch]
  );

  return (
    <Formik
      validationSchema={RegisterSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors, setFieldValue }) => (
        <Form className="space-y-6">
          <div className="space-y-6">
            <div className="flex space-x-6">
              <Input
                name="name"
                errorMessage={errors.name}
                onChange={(event) => setFieldValue("name", event.target.value)}
                placeholder="İsim"
              />
              <Input
                name="username"
                errorMessage={errors.username}
                onChange={(event) =>
                  setFieldValue("username", event.target.value)
                }
                placeholder="Kullanıcı Adı"
              />
            </div>
            <Input
              name="email"
              autoComplete="on"
              errorMessage={errors.email}
              onChange={(event) => setFieldValue("email", event.target.value)}
              placeholder="Email"
            />
            <Input
              name="password"
              type="password"
              onChange={(event) =>
                setFieldValue("password", event.target.value)
              }
              errorMessage={errors.password}
              placeholder="Şifre"
              autoComplete="new-password"
            />
          </div>
          <Button className="w-full" loading={isSubmitting} type="submit">
            Kaydol
          </Button>
        </Form>
      )}
    </Formik>
  );
};

Register.getLayout = (page: React.ReactElement) => {
  return (
    <AuthLayout>
      <AuthLayout.Title>Yeni hesap oluştur</AuthLayout.Title>
      <AuthLayout.Description link="/auth/login" linkText="Giriş Yap">
        Zaten hesabınız var mı?
      </AuthLayout.Description>
      {page}
    </AuthLayout>
  );
};

export default Register;
