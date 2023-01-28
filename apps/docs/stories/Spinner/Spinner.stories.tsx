import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Spinner, SpinnerProps } from "@devsozluk/ui/src";

export default {
  title: "components/Spinner",
  component: Spinner,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "light"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
  },
} as ComponentMeta<typeof Spinner>;

const Template = (args: SpinnerProps) => (
  <Spinner {...args}>Hello World</Spinner>
);

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
};
