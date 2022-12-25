import classNames from "classnames";
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
      <div className={classNames("inline-flex flex-col flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ", variants[status])}>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-4 text-sm font-normal">{children}</div>
    </div>
  );
};

export default StatusMessage;
