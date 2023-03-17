import { Button } from "@devsozluk/ui";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const Dropdown = () => {
  const handleLogout = () => {};

  const userNavigations = [
    {
      name: "Hesap Ayarları",
    },
    {
      name: "Konu Oluştur",
    },
    {
      name: "Çıkış",
      onClick: handleLogout,
    },
  ];

  return (
    <Menu>
      <Menu.Button>
        <button className="flex items-center justify-center gap-x-2 rounded-lg py-2 px-4 font-bold text-secondary">
          ali osman
        </button>
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute top-40 flex w-[160px] rounded bg-gray-800 md:top-14 md:w-[140px]"
      >
        <Menu.Items className="flex w-full flex-col gap-y-2 space-y-2 rounded text-center font-medium">
          {userNavigations.map((nav, index) => (
            <Menu.Item key={index} as={Fragment}>
              <Button size="sm" variant="primary" onClick={nav.onClick}>
                {nav.name}
              </Button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
