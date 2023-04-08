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

export const UpdateAccountSchema = Yup.object().shape({
  name: Yup.string().required("Adınızı yazmalısınız."),
  user_name: Yup.string().required("Kullanıcı adınızı yazmalısınız."),
  email: Yup.string()
    .email("Yazdığınız bir mail adresi değil.")
    .required("Mail adresinizi girin."),
});

export const UpdateProfileSchema = Yup.object().shape({
  biography: Yup.string()
    .required("Biyografinizi yazmalısınız.")
    .min(5, "Biyografiniz en az 5 karekterden oluşmalıdır."),
});

export const AddEntrySchema = Yup.object().shape({
  content: Yup.string()
    .required("Entry içeriği yazmalısınız.")
    .min(5, "Entry içeriği en az 5 karekter olmalıdır."),
});
