import TopicAddEntry from "@/components/Topic/AddEntry";
import Entry from "@/components/Topic/Entry";
import supabase from "@/libs/supabase";
import { setTopic } from "@/store/topic/topicSlice";
import { IEntry, ITopic } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";

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
    <div className="flex max-w-3xl flex-col gap-y-5 pb-10">
      <div className="flex items-center justify-between">
        <Link href={"/konu/" + topic.slug} className="mb-1 text-lg font-bold text-primary">
          {topic.title}
        </Link>
      </div>
      <Topic.Entries />
      <Topic.AddEntry />
    </div>
  )
};

Topic.Entries = () => {
  const { entries } = useAppSelector(state => state.topic)

  return (
    <Fragment>
      {entries?.map((entry, index) => (
        <Entry {...entry} key={index} />
      ))}
    </Fragment>
  )
}

Topic.AddEntry = TopicAddEntry;

export default Topic;
