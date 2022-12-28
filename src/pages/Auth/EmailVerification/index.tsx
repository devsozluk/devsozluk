import animationData from "@/lotties/4541-mail-verification.json";
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
    <div className="h-full flex flex-col items-center justify-center space-y-6  text-center">
      <div className="w-48 h-48">
        <Lottie options={{ animationData }} />
      </div>
      <h1 className="text-4xl font-extrabold">E-postanı kontrol et</h1>
      <div className="text-placeholder space-y-5">
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
