import React from "react";
import classNames from "classnames";
import { Spinner } from "../Spinner/Spinner";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  isActive?: any;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  loading,
  className,
  isActive,
  ...args
}) => {
  const classes = classNames(
    className,
    "inline-flex justify-center p-1 md:p-2 gap-x-2 transition-all disabled:opacity-50 disabled:cursor-auto  rounded cursor-pointe text-gray-400 hover:text-white hover:bg-gray-600 disabled:cursor-not-allowed",
    { "!text-white bg-gray-800": isActive }
  );

  return (
    <button className={classes} {...args}>
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};
