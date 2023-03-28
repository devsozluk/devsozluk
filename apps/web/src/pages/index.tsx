import Entry from "@/components/Topic/Entry";
import supabase from "@/libs/supabase";
import { IEntry } from "@/types";
import Link from "next/link";
import { MdComment } from "react-icons/md";

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("entries")
    .select("*, author(*), topic(slug, title, entryCount)")
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
    <div className="flex justify-evenly">
      <div className="flex w-full max-w-3xl flex-col gap-y-10 divide-y divide-opacity-70  divide-gray-700 pb-10">
        {entries?.map((entry) => (
          <Home.EntryCard key={entry.id} {...entry} />
        ))}
      </div>
    </div>
  );
};

Home.EntryCard = (entry: IEntry) => {
  const { id, topic } = entry;
  return (
    <div key={id} className="flex w-full flex-col gap-y-3 pt-3">
      <div className="flex items-center justify-between">
        <Link
          href={"/topic/" + topic.slug}
          className="mb-1 text-lg font-bold text-primary"
        >
          {topic.title}
        </Link>
        <div className="mt-2 flex gap-x-3 text-xs font-bold">
          <span className="flex items-center gap-x-1">
            <MdComment size={16} />
            {topic.entryCount}
          </span>
        </div>
      </div>
      <Entry {...entry} />
    </div>
  );
};

export default Home;
