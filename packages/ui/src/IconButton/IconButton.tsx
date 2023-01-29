import React from "react";
import { Spinner } from "../Spinner/Spinner";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  loading,
  ...args
}) => {
  return (
    <button
      className="inline-flex justify-center p-2 rounded cursor-pointe text-gray-400 hover:text-white hover:bg-gray-600 disabled:cursor-not-allowed"
      {...args}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};
