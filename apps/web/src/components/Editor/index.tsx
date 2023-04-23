"use client";

import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import classNames from "classnames";
import React, { PropsWithChildren, useEffect } from "react";
import Link from "@tiptap/extension-link";
import { SpoilerEditor, SpoilerOutput } from "@n8body/tiptap-spoiler";
import EditorMenu from "./Menu.editor";
import Placeholder from "@tiptap/extension-placeholder";

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
  return <p className="pt-1 text-md text-red-400">{errorMessage}</p>;
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
          "min-w-full whitespace-pre-wrap line-clamp-3 !text-base w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-a:text-primary-400 format-strong:text-gray-400 format:font-normal format-invert",
      },
    },
    extensions: [
      Placeholder.configure({
        placeholder: placeholder || "Yazmaya başla...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      SpoilerEditor.configure({
        spoilerClass: "beautiful-spoiler",
        inputRegex: /(?:^|\s)((?:\[spoiler\])((?:[^||]+))(?:\[\/spoiler\]))$/, // to match [spoiler]text[/spoiler]
        pasteRegex: /(?:^|\s)((?:\[spoiler\])((?:[^||]+))(?:\[\/spoiler\]))/g, // same here
        inclusive: true,
      }),
      SpoilerOutput.configure({
        spoilerClass: "etest",
        spoilerOpenClass: "open-spoiler",
        spoilerCloseClass: "closed-spoiler",
        as: "code",
        inline: false,
      }),
      StarterKit.configure({}),
    ],
    content: value || "",
  });

  useEffect(() => {
    editor?.commands.setContent(value || "");
  }, [value]);

  const baseClasess = classNames({
    className: true,
    "w-full mb-4 border-gray-200 rounded-lg bg-gray-700 border-gray-600 border border-transparent transition-all group-focus-within:!border-blue-500 mb-0":
      true,
    "!border-red-400 !text-red-400": false,
  });

  return (
    <div className="group relative">
      <p className="block mb-2 text-sm font-medium text-white">{label}</p>
      <div className={baseClasess}>
        <div className="px-4 py-2 bg-gray-800 rounded-t-lg">
          <EditorContent
            className="outline-none min-w-full  w-full px-0 text-sm text-white placeholder-gray-400 !border-0"
            editor={editor}
            {...rest}
          />
        </div>
        <div className="flex items-center px-2 py-2 w-full">
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
  return <React.Fragment>{children}</React.Fragment>;
};

export default CEditor;
