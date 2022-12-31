import Button from "@/components/Elements/Button";
import Input from "@/components/Form/Input";
import StatusMessage from "@/components/Form/StatusMessage";
import { authLogin } from "@/store/auth/authThunk";
import { LoginFormData } from "@/types/index";
import { useAppDispatch } from "@/utils/hooks";
import { LoginSchema } from "@/utils/schemas";
import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const initialValues: LoginFormData = { email: "", password: "" };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (values: LoginFormData, formikActions: any) => {
      const { payload } = await dispatch<any>(authLogin({ values, formikActions }));
      if (payload.user) navigate("/");
    },
    [dispatch]
  );

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-10">
      <h1 className="text-4xl font-extrabold">Giriş</h1>
      <Formik validationSchema={LoginSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, errors, isValid }) => (
          <>
            <Form className="w-[400px] space-y-6">
              {errors.responseMessage && <StatusMessage>{errors.responseMessage}</StatusMessage>}
              <div className="space-y-6">
                <Input name="email" errorText={errors.email} placeholder="Email" renderLeftIcon={<RiMailLine size={24} />} />
                <Input
                  name="password"
                  type="password"
                  errorText={errors.password}
                  placeholder="Şifre"
                  renderLeftIcon={<RiLockPasswordLine size={24} />}
                />
              </div>
              <Button className="w-full" loading={isSubmitting} type="submit" disabled={!isValid}>
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
