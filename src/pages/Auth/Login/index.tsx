import React from "react";
import { LoginFormData } from "@/types/index";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/Auth";
import { LoginSchema } from "@/validations/index";
import altogic from "@/libs/altogic";

import { RiMailLine, RiLockPasswordLine } from "react-icons/ri";

const Login: React.FC = () => {
  const { setUser, setSession } = useAuthContext();
  const initialValues: LoginFormData = { email: "", password: "" };

  const navigate = useNavigate();

  const handleLogin = async ({ email, password }: LoginFormData, { setSubmitting }: any) => {
    const { user, session, errors } = await altogic.auth.signInWithEmail(email, password);
    if (user) {
      setUser(user);
      setSession(session);
      toast.success("login you are redirected to the successful homepage");
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
