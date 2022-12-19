import React from "react";

const TopicLoader: React.FC = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-5 bg-gray-700 rounded max-w-[360px]"></div>
    </div>
  );
};

export default TopicLoader;
