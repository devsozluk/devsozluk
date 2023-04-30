import { Button } from "@devsozluk/ui";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import filterItems, { IFilterItem } from "./Filter.items";

const TopicsFilter = () => {
  return (
    <div className="flex items-center justify-start md:max-w-3xl py-2 gap-x-2 md:gap-x-4 w-full mb-4 overflow-x-auto">
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

  return (
    <Button
      className="py-1 px-1 md:px-4 md:py-2 min-w-fit md:min-w-max"
      variant={hasSeletected ? "primary" : "dark"}
      size="sm"
      onClick={handleSelect}
    >
      {title}
    </Button>
  );
};

export default TopicsFilter;
