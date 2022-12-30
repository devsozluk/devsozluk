import React from "react";

const topicLoader = () => (
    <div role="status" className="max-w-sm animate-pulse">
    <div className="h-5 bg-gray-700 rounded max-w-[360px]"></div>
  </div>
)

const SidebarLoader: React.FC = () => {
  return (
    <div className="space-y-5">
      {topicLoader()}
      {topicLoader()}
      {topicLoader()}
      </div>
  );
};

export default SidebarLoader;
