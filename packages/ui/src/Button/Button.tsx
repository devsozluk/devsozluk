import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { Spinner } from "../Spinner/Spinner";

const buttonStyles = cva(
  [
    "flex items-center justify-center rounded border-2 text-lg font-medium transition-all disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-buttonPrimary bg-buttonPrimary text-white hover:bg-transparent hover:text-buttonPrimary",
        outline:
          "border-buttonPrimary bg-transparent text-buttonPrimary hover:bg-buttonPrimary hover:text-white",
        danger:
          "border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500",
      },
      size: {
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
  ...props
}) => {
  return (
    <button className={buttonStyles({ className, variant, size })} {...props}>
      {loading ? <Spinner /> : children}
    </button>
  );
};
