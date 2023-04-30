import { Button } from "@devsozluk/ui";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import filterItems, { IFilterItem } from "./Filter.items";

const TopicsFilter = () => {
  return (
    <div className="flex items-center justify-center md:justify-start max-w-3xl py-2 gap-x-4 w-full mb-4 overflow-x-auto">
      {filterItems.map((item) => (
        <TopicsFilter.Item key={item.id} {...item} />
      ))}
    </div>
  );
};

TopicsFilter.Item = ({ title, icon, name }: IFilterItem) => {
  const router = useRouter();

  const handleSelect = (event: ChangeEvent<{}>) => {
    event.preventDefault();

    router.push(
      {
        query: { filter: name },
      },
      undefined,
      { shallow: true }
    );
  };

  const hasSeletected = router.query.filter === name;

  const classes = classNames(
    "flex items-center gap-x-2 !px-2 !md:px-4",
    hasSeletected ? "text-white !bg-gray-700" : "text-gray-400"
  );

  return (
    <Button
      variant={hasSeletected ? "primary" : "dark"}
      size="sm"
      onClick={handleSelect}
    >
      {title}
    </Button>
  );
};

export default TopicsFilter;
