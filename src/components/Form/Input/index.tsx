import classnames from "classnames";
import { ErrorMessage, Field } from "formik";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  label?: string;
  errorText?: string;
  renderLeftIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ name, type = "text", errorText, renderLeftIcon, label, placeholder, ...props }) => {
  return (
    <div className="group w-full">
      <p className="mb-1">{label}</p>
      <div
        className={classnames(
          "flex items-center space-x-3 rounded border border-placeholder py-4 px-3 text-placeholder transition-all focus-within:border-tertiary",
          {
            "!border-red-500": errorText,
          }
        )}
      >
        {renderLeftIcon}
        <Field
          className="w-full bg-transparent text-placeholder outline-none placeholder:text-placeholder"
          name={name}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      </div>
      <ErrorMessage className="pt-1 text-sm text-red-500" name={name} component="p" />
    </div>
  );
};

export default Input;
