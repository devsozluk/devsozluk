import { Button } from "@devsozluk/ui";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import filterItems, { IFilterItem } from "./Filter.items";

const TopicsFilter = () => {
  return (
    <div className="flex items-center justify-center md:justify-start  max-w-3xl p-2 gap-x-3 w-full bg-gray-800 shadow-lg border-gray-700 border-opacity-25 rounded mb-4">
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
    "flex items-center gap-x-2",
    hasSeletected ? "text-white !bg-gray-700" : "text-gray-400"
  );

  return (
    <Button variant="dark" size="sm" className={classes} onClick={handleSelect}>
      {icon}
      {title}
    </Button>
  );
};

export default TopicsFilter;
