import Spinner from "@/components/Loading";
import classNames from "classnames";
import React from "react";

const variants = {
  primary: "border-buttonPrimary bg-buttonPrimary text-white hover:bg-transparent hover:text-buttonPrimary",
  danger: "border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500",
};

const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  renderLeftIcon?: React.ReactNode;
  renderRigthIcon?: React.ReactNode;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  renderLeftIcon,
  renderRigthIcon,
  variant = "primary",
  size = "lg",
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "flex items-center justify-center rounded border-2 text-lg font-medium transition-all disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {!loading && renderLeftIcon}
      {loading ? <Spinner size="sm" className="text-current" /> : children}
      {!loading && renderRigthIcon}
    </button>
  );
};

export default Button;
