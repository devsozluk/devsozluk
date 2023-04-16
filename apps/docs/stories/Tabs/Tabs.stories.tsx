import React from "react";

import { ComponentMeta } from "@storybook/react";

import { Select, Tabs, TabsProps } from "@devsozluk/ui";

const tabsConstant = [
  {
    label: "Tümü",
    element: <div>Tümü</div>,
  },
  {
    label: "Yeni",
    element: <div>Yeni</div>,
  },
  {
    label: "Popüler",
    element: <div>Popüler</div>,
  },
];

export default {
  title: "components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      iframeHeight: 1000,
      description: {
        component: "Tabs component",
      },
    },
  },
} as ComponentMeta<typeof Select>;

export const Default = (args: TabsProps) => <Tabs tabs={tabsConstant} />;
