import { cx } from "class-variance-authority";
import React from "react";

const baseClasses =
  "w-full mb-4 border border-gray-200 rounded-lg bg-gray-700 border-gray-600";
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
        className={cx(
          className,
          errorMessage ? cx(baseClasses, errorClasses) : baseClasses
        )}
      >
        <div className="px-4 py-2 rounded-t-lg bg-gray-800">
          <textarea
            className="w-full px-0 text-sm outline-none border-0 bg-gray-800 focus:ring-0 text-white placeholder-gray-400"
            {...props}
          ></textarea>
        </div>
        {children}
      </div>
      {errorMessage && <ErrorField errorMessage={errorMessage} />}
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
