import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Button, ButtonProps } from "@devsozluk/ui/src";

export default {
  title: "components/Button",
  component: Button,
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
    variant: {
      control: {
        type: "select",
        options: ["primary", "danger", "link"],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template = (args: ButtonProps) => <Button {...args}>Hello World</Button>;

export const Primary = Template.bind({});

Primary.args = {
  variant: "primary",
};

export const Outline = Template.bind({});

Outline.args = {
  variant: "outline",
};

export const Danger = Template.bind({});

Danger.args = {
  variant: "danger",
};
