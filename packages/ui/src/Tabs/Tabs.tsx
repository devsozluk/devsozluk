import { Tab } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";
import { useMemo } from "react";

export type TabType = {
  label: string;
  icon?: React.ReactNode;
  element: React.ReactNode;
};

export interface TabsProps {
  tabs: TabType[];
}

export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  if (!tabs) return null;

  const tabContents = useMemo(() => Object.values(tabs), [tabs]);

  return (
    <Tab.Group>
      <Tab.List className="flex flex-wrap items-center  -mb-px text-sm font-medium text-center border-b text-gray-400 border-gray-700">
        {tabContents.map(({ label, icon }, key) => (
          <Tab
            key={key}
            className={({ selected }) =>
              classNames(
                "mr-2 w-inline-block p-4 border-b-2 outline-none rounded-t-lg hover:text-gray-300 flex gap-x-1 items-center",
                { "border-blue-600 text-blue-500": selected },
                { "border-transparent": !selected },
                {
                  "!mr-0": key === tabContents.length - 1,
                }
              )
            }
          >
            {icon && <span className="mr-2">{icon}</span>}
            {label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tabContents.map(({ element }, key) => (
          <Tab.Panel key={key}>{element}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
