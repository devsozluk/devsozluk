import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { Spinner } from "../Spinner/Spinner";

const buttonStyles = cva(
  [
    "flex items-center justify-center gap-x-2 rounded font-medium transition-all disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
        outline:
          "border-blue-700 bg-transparent text-blue-700 hover:bg-blue-700 hover:text-white",
        danger:
          "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:text-white",
        link: "border-transparent bg-transparent text-white hover:bg-buttonPrimary hover:text-white",
        dark: "text-white font-medium  bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700",
      },
      size: {
        xs: "py px text-sm",
        sm: "py-2 px-4 text-sm",
        md: "py-2 px-6 text-md",
        lg: "py-3 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonStyles>;
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {
  renderLeftIcon?: React.ReactNode;
  renderRigthIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  variant,
  size,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={buttonStyles({ className, variant, size })}
      {...props}
    >
      {loading && <Spinner variant="light" size="sm" />}
      {children}
    </button>
  );
};
