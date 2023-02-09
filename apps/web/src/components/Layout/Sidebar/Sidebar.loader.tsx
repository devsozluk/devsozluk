import React from "react";

const Sidebar = () => {
  return (
    <div className="space-y-5">
      <Sidebar.Loader />
      <Sidebar.Loader />
      <Sidebar.Loader />
    </div>
  );
};

const Loader = () => (
  <div role="status" className="max-w-sm animate-pulse">
    <div className="h-5 max-w-[360px] rounded bg-gray-700"></div>
  </div>
);

Sidebar.Loader = Loader;

export default Loader;
