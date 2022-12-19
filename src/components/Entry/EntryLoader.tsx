import React from "react";

const TopicLoader: React.FC = () => {
  return (
    <div role="status" className="max-w-2xl animate-pulse">
      <div className="mt-5 h-20 bg-gray-700 mb-2.5"></div>
      <div className="flex items-center justify-end mt-8 space-x-1">
        <div className="">
          <div className="h-4 bg-gray-700 mb-2"></div>
          <div className="w-48 h-2 bg-gray-700"></div>
        </div>
        <svg
          className="w-14 h-14 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>{" "}
    </div>
  );
};

export default TopicLoader;
