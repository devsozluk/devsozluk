import MDEditor, { ContextStore } from "@uiw/react-md-editor";
import classNames from "classnames";
import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  name: string;
  value?: string;
  placeholder?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  errorText?: string;
  renderLeftIcon?: React.ReactNode;
  onChange?: (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;
}

const Editor: React.FC<InputProps> = ({ name, type = "text", errorText, renderLeftIcon, label, placeholder, ...props }) => {
  return (
    <div className="group w-full">
      <p className="mb-1">{label}</p>
      <MDEditor
        height={300}
        className={classNames("rounded-lg border-[1px]  bg-transparent focus-within:border-tertiary", {
          "border-red-500": errorText,
          "border-placeholder": !errorText,
        })}
        preview="edit"
        {...props}
      />
      <p className="pt-1 text-sm text-red-500">{errorText}</p>
    </div>
  );
};

export default Editor;
