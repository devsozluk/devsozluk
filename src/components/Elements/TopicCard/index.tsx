import newTopic from "@/assets/lotties/new-topic.json";
import Button from "@/components/Elements/Button";
import { toggleTopicModal } from "@/store/topic/topicSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import Lottie from "lottie-react-web";
import { toast } from "react-toastify";

const TopicCard = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const openTopicModal = async () => {
    if (!isLoggedIn) return toast.error("Konu oluşturmak için giriş yapmanız gerekmektedir.");
    dispatch(toggleTopicModal());
  };

  return (
    <div className="ml-12 mt-8 hidden h-80 w-[300px] max-w-sm flex-col items-center justify-center space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:h-96 xl:flex">
      <div className="pointer-events-none h-20 w-20">
        <Lottie options={{ animationData: newTopic }}></Lottie>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Konu açmak için aşağıdaki butona tıklayabilirsin. açtığınız konu onaylandıktan sonra yayınlanacaktır.
      </p>
      <Button onClick={openTopicModal} size="sm">
        Konu Oluştur
      </Button>
    </div>
  );
};

export default TopicCard;
