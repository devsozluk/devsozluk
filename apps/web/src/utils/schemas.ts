import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Yazdığınız bir mail adresi değil.")
    .required("Mail adresinizi girin."),
  password: Yup.string()
    .min(5, "Şifreniz en az 5 karekter olması gerekmektedir.")
    .required("Şifrenizi giriniz."),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Adını yaz."),
  username: Yup.string().required("Kullanıcı adınızı yazınız."),
  email: Yup.string()
    .email("Yazdığınız bir mail adresi değil.")
    .required("Mail adresinizi girin."),
  password: Yup.string()
    .min(5, "Şifreniz en az 5 karekter olması gerekmektedir.")
    .required("Şifrenizi giriniz."),
});

export const CreateTopicSchema = Yup.object().shape({
  title: Yup.string().required("Konu başlığı yazmalısınız."),
  content: Yup.string()
    .required("Konu içeriği yazmalısınız.")
    .min(5, "Konu içeriği en az 5 karekterden oluşmalıdır."),
});

export const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string().required("Adınızı yazınız."),
  password: Yup.string().min(
    5,
    "Şifreniz en az 5 karekter olması gerekmektedir."
  ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Şifreler eşleşmiyor."
  ),
});

export const AddEntrySchema = Yup.object().shape({
  content: Yup.string()
    .required("Entry içeriği yazmalısınız.")
    .min(5, "Entry içeriği en az 5 karekter olmalıdır."),
});
