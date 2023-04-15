import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Select, SelectProps } from "@devsozluk/ui";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

export default {
  title: "components/Select",
  component: Select,
  parameters: {
    layout: "centered",
    docs: {
      iframeHeight: 1000,
      description: {
        component: "Select component",
      },
    },
  },
} as ComponentMeta<typeof Select>;

export const Select_Box = (args: SelectProps) => (
  <Select value="1" {...args} options={options} />
);
