import StatusIcon from "@/components/Elements/Icons";
import React from "react";

const variants = {
  error: "text-red-500 bg-orange-100 dark:bg-red-700 dark:text-red-200",
  success: "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
  warning: "text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200",
};

interface Props {
  children: React.ReactNode;
  status?: "error" | "success" | "warning";
}

const StatusMessage: React.FC<Props> = ({ children, status = "error" }) => {
  return (
    <div
      id="toast-warning"
      className="flex items-center p-4 w-full text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 "
      role="alert"
    >
      <StatusIcon variants={variants} status={status} />
      <div className="ml-4 text-sm font-normal">{children}</div>
    </div>
  );
};

export default StatusMessage;
