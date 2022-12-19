import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { useAuthContext } from "@/context/AuthContext";
import altogic from "@/libs/altogic";
import { LoginFormData } from "@/types/index";
import { LoginSchema } from "@/validations/index";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";

const Login: React.FC = () => {
  const { setUser, setSession } = useAuthContext();
  const initialValues: LoginFormData = { email: "", password: "" };

  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: LoginFormData, { setSubmitting }: any) => {
    const { user, session, errors } = await altogic.auth.signInWithEmail(email, password);
    if (user) {
      setUser(user);
      setSession(session);
      toast.success("Giriş başarılı, ana sayfaya yönlendiriliyorsunuz.");
      navigate("/");
    } else {
      toast.error(errors?.items[0].message);
    }
    setSubmitting(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Formik validationSchema={LoginSchema} initialValues={initialValues} onSubmit={handleLogin}>
        {({ isSubmitting, errors, isValid }) => (
          <>
            <Form className="space-y-8 w-[400px]">
              <div className="space-y-4">
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
