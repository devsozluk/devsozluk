import classNames from "classnames";
import { useRef } from "react";
import { useHover } from "usehooks-ts";
import Tippy from "@tippyjs/react";
import useActions, { IMenu } from "./Actions.menu";
import { useRouter } from "next/router";

const Actions = () => {
  const menus = useActions();
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const classes = classNames(
    "flex flex-col items-center hidden mb-4 space-y-2",
    {
      "!flex": isHover,
    }
  );

  return (
    <div ref={hoverRef} className="fixed right-8 bottom-8 group">
      <div id="speed-dial-menu-square" className={classes}>
        {menus.map((action, index) => (
          <Actions.Item {...action} key={index} />
        ))}
      </div>
      <button
        type="button"
        className="flex items-center justify-center text-white bg-blue-700 rounded-lg w-12 h-12 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
      >
        <svg
          aria-hidden="true"
          className="w-8 h-8 transition-transform group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>
    </div>
  );
};

Actions.Item = ({ title, icon, link, onClick }: IMenu) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else onClick!();
  };

  return (
    <Tippy content={title} placement="left" theme="custom">
      <button
        type="button"
        onClick={handleClick}
        className="flex justify-center items-center w-12 h-12 rounded-lg border border-gray-600 shadow-sm hover:text-white text-gray-400 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-400"
      >
        {icon}
      </button>
    </Tippy>
  );
};

export default Actions;
