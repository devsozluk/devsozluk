import { setTopicModal } from "@/store/topic/topicSlice";
import { useAppDispatch } from "@/utils/hooks";
import { HiDocumentPlus } from "react-icons/hi2";

export type IMenu = {
  title: string;
  icon?: React.ReactElement;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function Actions(): IMenu[] {
  const dispatch = useAppDispatch();

  const openTopicModal = () => {
    dispatch(setTopicModal(true))
  }

  return [
    {
      title: "Konu Oluştur",
      icon: <HiDocumentPlus size={18} />,
      onClick: openTopicModal
    },
  ];
}
