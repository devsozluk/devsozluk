import Entry from "@/components/Topic/Entry";
import TopicHeader from "@/components/Topic/Header";
import supabase from "@/libs/supabase";
import { IEntry } from "@/types";
import classNames from "classnames";

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("entries")
    .select("*, author(*), topic(slug, title, entryCount, viewsCount)")
    .order("created_at", { ascending: false })
    .limit(10);

  return {
    props: {
      entries: data,
    },
  };
}

const Home = ({ entries }: { entries: IEntry[] }) => {
  return (
    <div className="flex justify-between">
      <div className="flex w-full max-w-3xl flex-col divide-y divide-opacity-30 divide-gray-700">
        {entries?.map((entry, index) => (
          <Home.EntryCard key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
};

Home.EntryCard = ({ entry, index }: { entry: IEntry; index: number }) => {
  const { id, topic } = entry;
  const hasFirstEntry = index === 0 ? "pb-4" : "py-4";

  return (
    <div
      key={id}
      className={classNames("flex w-full flex-col gap-y-6", hasFirstEntry)}
    >
      <TopicHeader {...topic} />
      <Entry {...entry} />
    </div>
  );
};

export default Home;
