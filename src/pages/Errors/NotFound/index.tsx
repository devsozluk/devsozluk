import { useNavigate } from "react-router-dom";

import animationData from "@/assets/lotties/404.json";
import Lottie from "lottie-react-web";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6  text-center">
      <div>
        <Lottie
          width={400}
          height={400}
          options={{
            animationData,
            loop: true,
            autoplay: true,
          }}
        />
      </div>
      <h1 className="text-4xl font-extrabold">Aradığın sayfayı bulamadık 😔</h1>
      <div className="space-y-5 text-placeholder">
        <p>Doğru bir adrese geldiğinden emin misin?</p>
        <button onClick={handleNavigate} className="text-primary">
          Anasayfaya dönmek için tıklayın
        </button>
      </div>
    </div>
  );
};
export default NotFound;
