import Spinner from "@/components/Spinner";
import React from "react";

type HTMLButtonTypeAttribute = "button" | "submit" | "reset";

interface Props {
  type?: HTMLButtonTypeAttribute;
  renderLeftIcon?: React.ReactNode;
  renderRigthIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  loading: boolean;
}

const Button: React.FC<Props> = ({ type = "button", loading, disabled, children, renderLeftIcon, renderRigthIcon }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="w-full bg-primary text-white py-4 px-6 rounded-lg flex items-center justify-center text-xl font-medium disabled:opacity-50"
    >
      {renderLeftIcon}
      {loading ? <Spinner /> : children}
      {renderRigthIcon}
    </button>
  );
};

export default Button;
