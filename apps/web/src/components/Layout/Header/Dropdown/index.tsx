import { useAppSelector } from "@/utils/hooks";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillCaretDown } from "react-icons/ai";
import useNavigations, { IMenu } from "./Dropdown.menu";

const Dropdown = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigations = useNavigations();
  const router = useRouter();

  const goProfile = () => {
    router.replace(`/profile/${user?.user_metadata.user_name}`);
  };

  return (
    <Menu>
      <Menu.Button
        as="button"
        className="flex items-center cursor-pointer justify-between px-2 text-sm rounded py-1.5 w-26 gap-x-2 font-semibold text-secondary"
      >
        <div className="flex items-center cursor-pointer gap-x-2">
          {user?.user_metadata?.name}
        </div>
        <AiFillCaretDown />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute right-8 z-20 w-56 py-2 mt-2 origin-top-right  rounded-md shadow-xl bg-gray-800"
      >
        <div
          tabIndex={0}
          onClick={goProfile}
          className="flex items-center cursor-pointer p-3 -mt-2 text-sm rounded-md truncate transition-colors duration-300 transform text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <Image
            className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
            width={100}
            height={100}
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata?.avatar_url}
          />
          <div className="mx-1">
            <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {user?.user_metadata?.name}
            </h1>
            <p className="text-xs truncate text-gray-500 dark:text-gray-400"></p>
            @{user?.user_metadata?.user_name}
          </div>
        </div>

        <hr className="border-gray-700 border-opacity-70" />

        <Menu.Items className="flex w-full flex-col rounded text-center font-medium">
          {navigations.map((item) => (
            <Dropdown.Item {...item} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Item = ({ id, title, onClick, link, icon, className }: IMenu) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else onClick!();
  };

  return (
    <Menu.Item
      key={id}
      as="button"
      onClick={handleClick}
      className={classNames(
        "flex items-center py-2 px-4 text-sm capitalize transition-colors duration-300 transform text-gray-300 hover:bg-gray-700 hover:text-white",
        className
      )}
    >
      <span className="w-6 h-6 mx-1 flex items-center justify-center">
        {icon}
      </span>
      {title}
    </Menu.Item>
  );
};

export default Dropdown;
