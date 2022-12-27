import classNames from "classnames";
import ErrorIcon from "@/components/Elements/Icons/ErrorIcon";
import SuccessIcon from "@/components/Elements/Icons/SuccessIcon";
import WarningIcon from "@/components/Elements/Icons/WarningIcon";

interface Props {
   status: "error" | "success" | "warning";
   variants: {
      error: string;
      success: string;
      warning: string;
   };
}

const StatusIcon: React.FC<Props> = ({ status, variants }) => {
   return (
      <div className={classNames("inline-flex flex-col flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ", variants[status])}>
         {status === "error" && <ErrorIcon />}
         {status === "success" && <SuccessIcon />}
         {status === "warning" && <WarningIcon />}
      </div>
   );
};
export default StatusIcon;