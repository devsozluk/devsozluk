import Button from "@/components/Elements/Button";
import Input from "@/components/Form/Input";
import StatusMessage from "@/components/Form/StatusMessage";
import AuthLayout, { AuthLayoutDescription, AuthLayoutTitle } from "@/components/Layout/AuthLayout";
import { authRegister } from "@/store/auth/authThunk";
import { RegisterFormData } from "@/types/index";
import { useAppDispatch } from "@/utils/hooks";
import { RegisterSchema } from "@/utils/schemas";
import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { RiLockPasswordLine, RiMailLine, RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const initialValues: RegisterFormData = { name: "", username: "", email: "", password: "" };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: RegisterFormData, formikActions: any) => {
      const { payload } = await dispatch<any>(authRegister({ values, formikActions }));
      if (payload.user) navigate(`/uyelik/email-dogrula`);
    },
    [dispatch]
  );

  return (
    <AuthLayout>
      <AuthLayoutTitle>Yeni hesap oluştur</AuthLayoutTitle>
      <AuthLayoutDescription link="/uyelik/giris" linkText="Giriş Yap">
        Zaten hesabınız var mı?
      </AuthLayoutDescription>
      <Formik validationSchema={RegisterSchema} initialValues={initialValues} onSubmit={handleSubmit} validateOnChange={false} validateOnBlur={false}>
        {({ isSubmitting, errors }) => (
          <Form className="space-y-6">
            {errors.responseMessage && <StatusMessage>{errors.responseMessage}</StatusMessage>}
            <div className="space-y-6">
              <div className="flex space-x-6">
                <Input name="name" errorText={errors.name} placeholder="İsim" renderLeftIcon={<RiUser3Line size={24} />} />
                <Input name="username" errorText={errors.username} placeholder="Kullanıcı Adı" renderLeftIcon={<RiUser3Line size={24} />} />
              </div>
              <Input name="email" errorText={errors.email} placeholder="Email" renderLeftIcon={<RiMailLine size={24} />} />
              <Input
                name="password"
                type="password"
                errorText={errors.password}
                placeholder="Şifre"
                renderLeftIcon={<RiLockPasswordLine size={24} />}
              />
            </div>
            <Button className="w-full" loading={isSubmitting} type="submit">
              Kaydol
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
