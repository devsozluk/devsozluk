import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your e-mail address."),
  password: Yup.string().min(5, "Password can be a minimum of 5 characters").required("Enter your password."),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Enter your username."),
  email: Yup.string().email("Invalid email").required("Enter your e-mail address."),
  password: Yup.string().min(5, "Password can be a minimum of 5 characters").required("Enter your password."),
});
