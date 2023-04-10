import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Button, TextArea, TextAreaProps, IconButton } from "@devsozluk/ui";
import { FaFileUpload, FaImage } from "react-icons/fa";

export default {
  title: "components/TextArea",
  component: TextArea,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    placeholder: {
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
} as ComponentMeta<typeof TextArea>;

export const Default = (args: TextAreaProps) => (
  <TextArea rows={4} placeholder="Your Comment" name="storybook" {...args} />
);

export const Actions = (args: TextAreaProps) => (
  <TextArea rows={4} placeholder="Your Comment" name="storybook" {...args}>
    <TextArea.Actions>
      <Button size="sm">Save</Button>
      <div>
        <IconButton>
          <FaFileUpload size={18} />
        </IconButton>
        <IconButton>
          <FaImage size={18} />
        </IconButton>
      </div>
    </TextArea.Actions>
  </TextArea>
);

export const ErrorField = (args: TextAreaProps) => (
  <TextArea
    rows={4}
    placeholder="Your Comment"
    name="storybook"
    errorMessage="This field is required"
    {...args}
  />
);

export const Label = (args: TextAreaProps) => (
  <TextArea
    label="Comment"
    placeholder="Your Comment"
    name="storybook"
    {...args}
  />
);
