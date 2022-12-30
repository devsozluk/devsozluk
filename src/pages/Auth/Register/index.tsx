import Button from "@/components/Elements/Button";
import Input from "@/components/Form/Input";
import StatusMessage from "@/components/Form/StatusMessage";
import { authRegister } from "@/store/auth/authThunk";
import { RegisterFormData } from "@/types/index";
import { useAppDispatch } from "@/utils/hooks";
import { RegisterSchema } from "@/utils/schemas";
import { Form, Formik } from "formik";
import React, { useCallback } from "react";
import { RiLockPasswordLine, RiMailLine, RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const initialValues: RegisterFormData = { username: "", email: "", password: "" };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: RegisterFormData, formikActions: any) => {
      const { payload } = await dispatch(authRegister({ values, formikActions }));
      if (payload) navigate(`/uyelik/email-dogrula`);
    },
    [dispatch]
  );

  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-10">
      <h1 className="text-4xl font-extrabold">Kaydol</h1>
      <Formik validationSchema={RegisterSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, errors }) => (
          <>
            <Form className="space-y-6 w-[400px]">
              {errors.responseMessage && <StatusMessage>{errors.responseMessage}</StatusMessage>}
              <div className="space-y-6">
                <Input name="username" errorText={errors.username} placeholder="username" renderLeftIcon={<RiUser3Line size={24} />} />
                <Input name="email" errorText={errors.email} placeholder="Email" renderLeftIcon={<RiMailLine size={24} />} />
                <Input
                  name="password"
                  type="password"
                  errorText={errors.password}
                  placeholder="Şifre"
                  renderLeftIcon={<RiLockPasswordLine size={24} />}
                />
              </div>
              <Button loading={isSubmitting} type="submit">
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
