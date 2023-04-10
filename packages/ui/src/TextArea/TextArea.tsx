import classNames from "classnames";
import React from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  errorMessage?: string;
  renderLeftIcon?: React.ReactNode;
  renderRightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const ErrorField = ({ errorMessage }: { errorMessage?: string }) => {
  return <p className="pt-2 text-md text-red-400">{errorMessage}</p>;
};

export const TextArea = ({
  label,
  errorMessage,
  renderLeftIcon,
  renderRightIcon,
  className,
  children,
  ...props
}: TextAreaProps) => {
  const baseClasess = classNames({
    className: true,
    "w-full mb-4 border-gray-200 rounded-lg bg-gray-700 border-gray-600 border border-transparent transition-all":
      true,
    "group-focus-within:!border-blue-500 mb-0": !children,
    "!border-red-400 !text-red-400": errorMessage,
  });

  const classes = classNames({
    "bg-gray-800 rounded-t-lg": children,
    "bg-gray-700 rounded-lg": !children,
  });

  return (
    <div className="group">
      <p className="block mb-2 text-sm font-medium text-white">{label}</p>
      <div className={baseClasess}>
        <div className={`px-4 py-2 ${classes}`}>
          <textarea
            className={`w-full px-0 text-sm outline-none text-white placeholder-gray-400 !border-0 ${classes}`}
            {...props}
          ></textarea>
        </div>
        {children}
      </div>
      <ErrorField errorMessage={errorMessage} />
    </div>
  );
};

const TextAreaActions = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-gray-600">
      {children}
    </div>
  );
};

TextArea.Actions = TextAreaActions;
