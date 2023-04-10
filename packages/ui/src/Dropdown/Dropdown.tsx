import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { PropsWithChildren } from "react";

export interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown = ({ children }: DropdownProps) => {
  const dropdownButton = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Dropdown.Button) {
      return child;
    }
  });

  const dropdownItems = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Dropdown.Item) {
      return child;
    }
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      {dropdownButton}
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="absolute"
      >
        <Menu.Items className="absolute -right-10 mt-2 w-56 rounded shadow bg-gray-700 text-sm text-gray-200 font-normal">
          {dropdownItems}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.Button = ({
  children,
  as,
}: PropsWithChildren<{ as?: React.ElementType }>) => {
  return (
    <Menu.Button as={as} className="flex items-center gap-x-2">
      {children}
    </Menu.Button>
  );
};

export type ItemProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

Dropdown.Item = ({ className, children, onClick, ...props }: ItemProps) => {
  return (
    <Menu.Item
      as="button"
      onClick={onClick}
      className={classNames(
        "px-4 py-2 w-full rounded flex gap-x-2 items-center hover:bg-gray-600 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </Menu.Item>
  );
};

export default Dropdown;
