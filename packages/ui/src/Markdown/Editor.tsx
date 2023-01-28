import MDEditor from "@uiw/react-md-editor";
import { cx } from "class-variance-authority";
import React from "react";

const baseClasses =
  "rounded-lg border-[1px] bg-transparent border-transparent focus-within:border-tertiary focus-within:ring-tertiary focus-within:ring-2 focus-within:ring-opacity-50";
const errorClasses =
  "border-red-400 focus-within:border-red-400 focus-within:ring-red-400 focus-within:ring-2 focus-within:ring-opacity-50";

export interface MarkdownEditorProps
  extends React.ComponentProps<typeof MDEditor> {
  name?: string;
  label?: string;
  errorMessage?: string;
  renderLeftIcon?: React.ReactNode;
}

const ErrorField = ({ errorMessage }: { errorMessage?: string }) => {
  return <p className="pt-2 text-md text-red-400">{errorMessage}</p>;
};

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  errorMessage,
  renderLeftIcon,
  label,
  ...props
}) => {
  return (
    <div className="group w-full">
      <p className="mb-1 text-white">{label}</p>
      <MDEditor
        className={cx(errorMessage ? [baseClasses, errorClasses] : baseClasses)}
        preview="edit"
        placeholder="adssdasda"
        {...props}
      />
      {errorMessage && <ErrorField errorMessage={errorMessage} />}
    </div>
  );
};
