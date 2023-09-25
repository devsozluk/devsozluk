import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import React, { PropsWithChildren, useEffect } from "react";
import EditorMenu from "./Menu.editor";
import { TiptapSpoiler } from "./extensions/Spoiler";

export interface ICEditorProps {
  children?: React.ReactNode;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  label?: string;
  className?: string;
  onUpdate: (value: string) => void;
}

const ErrorField = ({ errorMessage }: { errorMessage?: string }) => {
  return <p className="pt-1 text-red-400 text-md">{errorMessage}</p>;
};

const CEditor = ({
  errorMessage,
  label,
  children,
  className,
  value,
  onUpdate,
  placeholder,
  ...rest
}: ICEditorProps) => {
  const editor = useEditor({
    onUpdate: () => {
      onUpdate(editor?.getHTML() as string);
    },
    editorProps: {
      attributes: {
        class:
          "min-w-full !text-base w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-a:text-primary-400 format-strong:text-gray-400 format:font-normal format-invert",
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: placeholder || "Yazmaya başla...",
      }),
      TiptapSpoiler.configure({
        spoilerOpenClass: "spoiler-open",
        spoilerCloseClass: "spoiler-close",
      }),
      Link.configure({
        openOnClick: false,
      }),
      StarterKit.configure({}),
    ],
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  useEffect(() => {
    if (value === "") editor?.commands.setContent(value || "");
  }, [value]);

  const baseClasess = classNames({
    className: true,
    "w-full mb-4 border-gray-200 rounded-lg bg-gray-700 border-gray-600 border border-transparent transition-all group-focus-within:!border-blue-500 mb-0":
      true,
    "!border-red-400 !text-red-400": false,
  });

  return (
    <div className="relative group">
      <p className="block mb-2 text-sm font-medium text-white">{label}</p>
      <div className={baseClasess}>
        <div className="px-4 py-2 bg-gray-800 rounded-t-lg">
          <EditorContent
            className="outline-none min-w-full  w-full px-0 text-sm text-white placeholder-gray-400 !border-0"
            editor={editor}
            {...rest}
          />
        </div>
        <div className="flex items-center w-full px-2 py-2">
          <CEditor.Menu editor={editor as Editor} />
          {children}
        </div>
      </div>
      <ErrorField errorMessage={errorMessage} />
    </div>
  );
};

CEditor.Menu = EditorMenu;

CEditor.Actions = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

export default CEditor;
