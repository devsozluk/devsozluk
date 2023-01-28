import React, { useState } from "react";

import { ComponentMeta } from "@storybook/react";

import { MarkdownEditor, MarkdownEditorProps } from "@devsozluk/ui/src";

export default {
  title: "components/Markdown/Editor",
  component: MarkdownEditor,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    errorMessage: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof MarkdownEditor>;

export const Editor = (args: MarkdownEditorProps) => {
  const [value, setValue] = useState("");

  return (
    <MarkdownEditor
      name="storybook"
      value={value}
      onChange={(eventValue) => setValue(eventValue as string)}
      {...args}
    />
  );
};
