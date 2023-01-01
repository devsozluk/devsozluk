import Button from "@/components/Elements/Button";
import newTopic from "@/lotties/new-topic.json";
import { toggleTopicModal } from "@/store/topic/topicSlice";
import { useAppDispatch } from "@/utils/hooks";
import Lottie from "lottie-react-web";

const TopicCard = () => {
  const dispatch = useAppDispatch();
  const openTopicModal = async () => {
    dispatch(toggleTopicModal());
  };

  return (
    <div className="ml-12 mt-8 flex h-80 w-[300px] max-w-sm flex-col  justify-center space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <Lottie options={{ animationData: newTopic }}></Lottie>
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
