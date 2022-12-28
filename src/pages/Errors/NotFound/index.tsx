import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react-web";
import animationData from "@/lotties/404.json";

const NotFound: React.FC = () => {
   const navigate = useNavigate();

   const handleNavigate = () => {
      navigate("/");
   };

   return (
      <div className="h-full flex flex-col items-center justify-center space-y-6  text-center">
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
         <div className="text-placeholder space-y-5">
            <p>Doğru bir adrese geldiğinden emin misin?</p>
            <button onClick={handleNavigate} className="text-primary">
               Anasayfaya dönmek için tıklayın
            </button>
         </div>
      </div>
   );
};
export default NotFound;