import Spinner from "@/components/Elements/Spinner";
import React from "react";

type HTMLButtonTypeAttribute = "button" | "submit" | "reset";

interface Props {
  type?: HTMLButtonTypeAttribute;
  renderLeftIcon?: React.ReactNode;
  renderRigthIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  click?: () => void;
}

const Button: React.FC<Props> = ({ type = "button", click, loading, disabled, children, renderLeftIcon, renderRigthIcon }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="w-full bg-buttonPrimary text-white py-3 px-6 rounded flex items-center justify-center text-lg font-medium disabled:opacity-50 border-2 border-buttonPrimary hover:bg-transparent hover:text-buttonPrimary transition-all"
      onClick={click}
    >
      {renderLeftIcon}
      {loading ? <Spinner /> : children}
      {renderRigthIcon}
    </button>
  );
};

export default Button;
