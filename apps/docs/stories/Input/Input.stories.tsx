import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Input, InputProps } from "@devsozluk/ui/src";
import { RiMailFill } from "react-icons/ri";

export default {
  title: "components/Input",
  component: Input,
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
} as ComponentMeta<typeof Input>;

export const TextInput = (args: InputProps) => (
  <Input placeholder="Storybook" name="storybook" {...args} />
);

export const InputWithIcon = (args: InputProps) => (
  <Input
    placeholder="Storybook"
    name="storybook"
    renderLeftIcon={<RiMailFill size={22} />}
    {...args}
  />
);

export const ErrorField = (args: InputProps) => (
  <Input
    placeholder="Storybook"
    name="storybook"
    renderLeftIcon={<RiMailFill size={22} />}
    errorMessage="This field is required"
    {...args}
  />
);

export const Label = (args: InputProps) => (
  <Input label="Storybook" placeholder="Storybook" name="storybook" {...args} />
);
