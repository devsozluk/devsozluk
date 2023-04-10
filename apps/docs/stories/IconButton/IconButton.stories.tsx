import React from "react";

import { ComponentMeta } from "@storybook/react";

import { IconButton, IconButtonProps } from "@devsozluk/ui/src";

import { FiFilePlus } from "react-icons/fi";

export default {
  title: "components/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: {
        type: "boolean",
      },
    },
    loading: {
      control: {
        type: "boolean",
      },
    },
  },
} as ComponentMeta<typeof IconButton>;

const Template = (args: IconButtonProps) => (
  <IconButton {...args}>
    <FiFilePlus />
  </IconButton>
);

export const Default = Template.bind({});

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true,
};
