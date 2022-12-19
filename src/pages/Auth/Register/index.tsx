import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useAuthContext } from "@/context/AuthContext";
import altogic from "@/libs/altogic";
import { RegisterFormData } from "@/types/index";
import { RegisterSchema } from "@/validations/index";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

import { RiLockPasswordLine, RiMailLine, RiUser3Line } from "react-icons/ri";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const { setUser, setSession } = useAuthContext();
  const initialValues: RegisterFormData = { name: "", email: "", password: "" };

  const navigate = useNavigate();

  const handleRegister = async ({ name, email, password }: RegisterFormData, { setSubmitting }: any) => {
    const { user, session, errors } = await altogic.auth.signUpWithEmail(email, password, name);
    if (user) {
      setUser(user);
      setSession(session);
      toast.success("Kayıt başarılı, ana sayfaya yönlendiriliyorsunuz.");
      navigate("/");
    } else {
      toast.error(errors?.items[0].message);
    }
    setSubmitting(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Formik validationSchema={RegisterSchema} initialValues={initialValues} onSubmit={handleRegister}>
        {({ isSubmitting, errors, isValid }) => (
          <>
            <Form className="space-y-8 w-[400px]">
              <div className="space-y-4">
                <Input name="name" errorText={errors.name} placeholder="username" renderLeftIcon={<RiUser3Line size={24} />} />
                <Input name="email" type="email" errorText={errors.email} placeholder="Email" renderLeftIcon={<RiMailLine size={24} />} />
                <Input
                  name="password"
                  type="password"
                  errorText={errors.password}
                  placeholder="Şifre"
                  renderLeftIcon={<RiLockPasswordLine size={24} />}
                />
              </div>
              <Button loading={isSubmitting} type="submit" disabled={!isValid}>
                Kaydol
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
