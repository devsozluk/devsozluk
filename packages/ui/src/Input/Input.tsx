import { cx } from "class-variance-authority";
import React from "react";

const errorClasses = "!border-red-400";

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
  renderRightIcon,
  label,
  errorMessage,
  className,
  ...props
}) => {
  const baseClasses = `text-sm border outline-none transition-all h-12 border-gray-200 rounded-lg bg-gray-700 border-gray-600 rounded-lg block w-full p-2.5 bg-gray-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 ${
    renderLeftIcon ? "pl-8" : ""
  }`;
  const InputClasses = cx(
    className,
    errorMessage ? cx(baseClasses, errorClasses) : baseClasses
  );

  return (
    <div className="group w-full">
      <p className="block mb-2 text-sm font-medium text-white">{label}</p>
      <div className="relative w-full">
        <div className="absolute w-full inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {renderLeftIcon}
        </div>
        <input className={InputClasses} {...props} />
        <div className="absolute inset-y-0 flex right-0 items-center pr-3 z-50">
          {renderRightIcon}
        </div>
      </div>
      <ErrorField errorMessage={errorMessage} />
    </div>
  );
};
