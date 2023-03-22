import TopicAddEntry from "@/components/Topic/AddEntry";
import Entry from "@/components/Topic/Entry";
import supabase from "@/libs/supabase";
import { setTopic } from "@/store/topic/topicSlice";
import { IEntry, ITopic } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdComment } from "react-icons/md";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as { slug: string };

  const { data, error } = await supabase
    .from("topics")
    .select("*, author(*)")
    .eq("slug", slug)
    .single();

  const { data: entries } = await supabase
    .from("entries")
    .select("*, author(*)")
    .eq("topic", data?.id)

  if (error && !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      topic: data,
      entries
    },
  };
}

const Topic = ({ topic, entries }: { topic: ITopic, entries: IEntry[] }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTopic({ topic, entries }));
  }, [router])

  return (
    <div className="flex mt-3 md:mt-0 flex-col gap-y-5 pb-10 v">
      <div className="flex items-center justify-between">
        <Link href={"/konu/" + topic.slug} className="text-lg font-bold text-primary">
          {topic.title}
        </Link>
        <div className="mt-2 flex gap-x-3 text-xs font-bold">
          <span className="flex items-center gap-x-1">
            <MdComment size={16} />
            {topic.entryCount}
          </span>
        </div>
      </div>
      <Topic.Entries />
      <Topic.AddEntry />
    </div >
  )
};

Topic.Entries = () => {
  const { entries } = useAppSelector(state => state.topic)

  return (
    <div className="flex flex-col divide-y-2 divide-opacity-50 divide-gray-800">
      {entries?.map((entry, index) => (
        <Entry {...entry} key={index} />
      ))}
    </div>
  )
}

Topic.AddEntry = TopicAddEntry;

export default Topic;
