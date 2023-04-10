import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Alert, type AlertProps } from "@devsozluk/ui/src";

export default {
  title: "components/Alert",
  component: Alert,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    variant: {
      control: {
        type: "select",
        options: ["success", "danger", "warning"],
      },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template = (args: AlertProps) => <Alert {...args}>{args.children}</Alert>;

export const Success = Template.bind({});

Success.args = {
  variant: "success",
  children: "Başarıyla giriş yaptın.",
};

export const Warning = Template.bind({});

Warning.args = {
  variant: "warning",
  children: "Girdiğiniz bilgileri kontrol edin.",
};

export const Danger = Template.bind({});

Danger.args = {
  variant: "danger",
  children: "Girdiğiniz bilgileri kontrol edin.",
};
