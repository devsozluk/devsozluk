import { cx } from "class-variance-authority";
import React from "react";

const baseClasses =
  "w-full rounded ";
const errorClasses = "!border-red-400 !text-red-400";

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
  return (
    <div>
      <p className="block mb-2 text-sm font-medium text-white group">{label}</p>
      <div
        className={cx(className, errorMessage ? cx(baseClasses, errorClasses) : baseClasses)}
      >
        <div className="px-4 py-2 bg-transparent rounded-t border border-placeholder focus-within:border-tertiary">
          <textarea
            className="w-full px-0 text-sm text-gray-900 bg-transparent border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none"
            {...props}
          ></textarea>
        </div>
        {children}
      </div>
      {errorMessage && <ErrorField errorMessage={errorMessage} />}
    </div>
  );
};

const TextAreaActions = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-t  dark:border-gray-600">
      {children}
    </div>
  );
};

TextArea.Actions = TextAreaActions;
