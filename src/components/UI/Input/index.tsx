import React, { HTMLInputTypeAttribute } from "react";
import { Field, ErrorMessage } from "formik";
import classnames from "classnames";
interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  errorText?: string;
  renderLeftIcon?: React.ReactNode;
  onBlur?: React.ChangeEvent<HTMLInputElement>;
  onChange?: React.ChangeEvent<HTMLInputElement>;
}

const Input: React.FC<IProps> = ({ name, type = "text", errorText, renderLeftIcon, label, placeholder }) => {
  return (
    <div className="w-full">
      <div
        className={classnames("flex items-center border-tertiary border-[1px] rounded-lg py-4 px-3 space-x-2", {
          "border-red-500": errorText,
        })}
      >
        <label htmlFor={name}>{label}</label>
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
