import TopicLoader from "@/components/Loading/topic";
import Entry from "@/components/Topic/Entry";
import TopicHeader from "@/components/Topic/Header";
import { useGetUserEntriesQuery } from "@/services/topic";
import { IEntry, IProfile } from "@/types";
import classNames from "classnames";

export const Entries = ({ id }: IProfile) => {
  const { data: entries, isLoading } = useGetUserEntriesQuery(id);

  if (isLoading) return <TopicLoader />;
  else if (entries.length === 0) return <Entries.NoData />;
  else {
    return (
      <div className="flex w-full flex-col divide-y divide-opacity-30 divide-gray-700">
        {entries.map((entry: IEntry, index: number) => (
          <Entries.Card entry={entry} index={index} />
        ))}
      </div>
    );
  }
};

Entries.NoData = () => {
  return (
    <div className="max-w-lg mt-4">
      <div>
        <p className="text-sm text-gray-400">
          kullanıcı henüz bir yorum yazmamış.
        </p>
      </div>
    </div>
  );
};

Entries.Card = ({ entry, index }: { entry: IEntry; index: number }) => {
  const { id, topic } = entry;
  const hasFirstEntry = index === 0 ? "pb-4" : "py-4";

  return (
    <div
      key={id}
      className={classNames("flex w-full flex-col gap-y-6", hasFirstEntry)}
    >
      <TopicHeader topic={topic} />
      <Entry {...entry} />
    </div>
  );
};

export default Entries;
