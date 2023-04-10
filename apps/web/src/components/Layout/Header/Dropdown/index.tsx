import { useAppSelector } from "@/utils/hooks";
import { Button } from "@devsozluk/ui";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import useNavigations, { IMenu } from "./Dropdown.menu";

const Dropdown = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigations = useNavigations();

  return (
    <Menu>
      <Menu.Button>
        <button className="flex items-center  justify-between px-2 text-sm rounded py-1.5 w-40 font-semibold text-secondary">
          <div className="flex items-center gap-x-2">
            <Image
              width={0}
              height={0}
              className="h-7 w-7"
              src={user?.user_metadata?.avatar_url}
              alt={user?.user_metadata?.avatar_url}
            />
            {user?.user_metadata?.name}
          </div>
          <AiFillCaretDown />
        </button>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute top-44 flex rounded bg-gray-800 md:top-[70px] w-40 !m-0"
      >
        <Menu.Items className="flex w-full flex-col space-y-2 rounded text-center font-medium">
          {navigations.map((nav, index) => (
            <Dropdown.Item {...nav} />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Item = ({ id, title, onClick, link }: IMenu) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    } else onClick!();
  };

  return (
    <Menu.Item key={id} as={Fragment}>
      <Button size="sm" variant="link" onClick={handleClick}>
        {title}
      </Button>
    </Menu.Item>
  );
};

export default Dropdown;
