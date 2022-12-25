const errors = [
  {
    code: "email_not_verified",
    messsage: "E-posta adresiniz doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.",
  },
  {
    code: "invalid_credentials",
    messsage: "E-posta adresiniz veya şifreniz hatalı. Lütfen bilgilerinizi kontrol edin.",
  },
  {
    code: "email_not_unique",
    messsage: "Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi deneyin.",
  },
  {
    code: "missing_required_field_value",
    messsage: "Lütfen tüm alanları doldurun.",
  },
  {
    code: "create_object_database_error",
    messsage: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
  },
];

export default function (code?: string) {
  const error = errors.find((error) => error.code === code);
  return error?.messsage;
}
