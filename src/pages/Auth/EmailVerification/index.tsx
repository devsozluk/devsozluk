import animationData from "@/assets/lotties/mailVerification.json";
import { useAppSelector } from "@/utils/hooks";
import Lottie from "lottie-react-web";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6  text-center">
      <div className="h-48 w-48">
        <Lottie options={{ animationData }} />
      </div>
      <h1 className="text-4xl font-extrabold">E-postanı kontrol et</h1>
      <div className="space-y-5 text-placeholder">
        <p>
          <span className="font-bold">{user?.email}</span> adresine bir doğrulama bağlantısı gönderdik
        </p>
        <div className="flex flex-col">
          E-postayı almadınız mı?
          <button className="text-primary">tekrar göndermek için tıklayın</button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
