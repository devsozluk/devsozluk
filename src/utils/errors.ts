const errors = [
  {
    code: "email_not_verified",
    message: "E-posta adresiniz doğrulanmamış. Lütfen e-posta adresinizi doğrulayın.",
  },
  {
    code: "invalid_credentials",
    message: "E-posta adresiniz veya şifreniz hatalı. Lütfen bilgilerinizi kontrol edin.",
  },
  {
    code: "email_not_unique",
    message: "Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi deneyin.",
  },
  {
    code: "missing_required_field_value",
    message: "Lütfen tüm alanları doldurun.",
  },
  {
    code: "create_object_database_error",
    message: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
  },
  {
    code: "invalid_access_token",
    message: "Geçersiz veya süresi dolmuş erişim belirteci",
  },
  {
    code: "missing_access_token",
    message: "Erişim belirteci tanımlanamıyor",
  },
];

export default function (code?: string) {
  const error = errors.find((error) => error.code === code);
  return error?.message;
}
