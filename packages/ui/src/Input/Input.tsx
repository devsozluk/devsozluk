import React from "react";
import { cx } from "class-variance-authority";

const baseClasses =
  "flex items-center space-x-3 rounded border border-placeholder py-4 px-3 text-placeholder transition-all focus-within:border-tertiary";
const errorClasses = "!border-red-400 !text-red-400";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  renderLeftIcon?: React.ReactNode;
  renderRightIcon?: React.ReactNode;
}

const ErrorField = ({ errorMessage }: { errorMessage?: string }) => {
  return <p className="pt-2 text-md text-red-400">{errorMessage}</p>;
};

export const Input: React.FC<InputProps> = ({
  name,
  renderLeftIcon,
  label,
  errorMessage,
  ...props
}) => {
  return (
    <div className="group w-full">
      <p className="mb-1 text-white">{label}</p>
      <div
        className={errorMessage ? cx(baseClasses, errorClasses) : baseClasses}
      >
        {renderLeftIcon}
        <input
          className="w-full bg-transparent text-placeholder outline-none placeholder:text-placeholder"
          {...props}
        />
      </div>
      <ErrorField errorMessage={errorMessage} />
    </div>
  );
};
