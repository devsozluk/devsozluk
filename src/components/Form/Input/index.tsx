import classnames from "classnames";
import { ErrorMessage, Field } from "formik";
import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  errorText?: string;
  renderLeftIcon?: React.ReactNode;
  onBlur?: React.ChangeEvent<HTMLInputElement>;
  onChange?: React.ChangeEvent<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ name, type = "text", errorText, renderLeftIcon, label, placeholder, ...props }) => {
  return (
    <div className="w-full group">
      <p className="mb-1">{label}</p>
      <div
        className={classnames(
          "flex items-center border-placeholder border rounded py-4 px-3 space-x-3 text-placeholder focus-within:border-tertiary transition-all",
          {
            "!border-red-500": errorText,
          }
        )}
      >
        {renderLeftIcon}
        <Field
          className="bg-transparent w-full outline-none text-placeholder placeholder:text-placeholder"
          name={name}
          type={type}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage className="pt-1 text-sm text-red-500" name={name} component="p" />
    </div>
  );
};

export default Input;
