import React from "react";

interface IProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  label?: string;
}

const Input: React.FC<IProps> = ({ leftIcon, rightIcon, label, placeholder }) => {
  return (
    <div className="w-full">
      {label && <label>{label}</label>}
      <div className="flex items-center border-tertiary border-[1px] rounded-lg py-2 px-3">
        {leftIcon}
        <input className="bg-transparent w-full outline-none text-placeholder placeholder:text-placeholder" type="text" placeholder={placeholder} />
        {rightIcon}
      </div>
    </div>
  );
};

export default Input;
