import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import AlertIcons from "./Alert.icons";

const alertStyles = cva("flex items-center justify-center gap-x-2 text-md ", {
  variants: {
    variant: {
      warning: "text-orange-500 ",
      danger: "text-red-500",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "danger",
  },
});

type AlertBaseProps = VariantProps<typeof alertStyles>;
export interface AlertProps extends AlertBaseProps {
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children, variant }) => {
  const AlertIcon = AlertIcons[variant as keyof typeof AlertIcons];

  return (
    <div
      className="flex  items-center p-4 w-full text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className={alertStyles({ variant })}>
        <AlertIcon />
        {children}
      </div>
    </div>
  );
};
