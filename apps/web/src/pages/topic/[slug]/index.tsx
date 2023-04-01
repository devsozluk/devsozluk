import TopicAddEntry from "@/components/Topic/AddEntry";
import Entry from "@/components/Topic/Entry";
import TopicHeader from "@/components/Topic/Header";
import supabase from "@/libs/supabase";
import { setTopic } from "@/store/topic/topicSlice";
import { IEntry, ITopic } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as { slug: string };

  await supabase.rpc("increment_view_count", {
    topic_slug: slug,
  });

  const { data, error } = await supabase
    .from("topics")
    .select("*, author(*)")
    .eq("slug", slug)
    .single();

  const { data: entries } = await supabase
    .from("entries")
    .select("*, author(*)")
    .eq("topic", data?.id);

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
      entries,
    },
  };
}

const Topic = ({ topic, entries }: { topic: ITopic; entries: IEntry[] }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setTopic({ topic, entries }));
  }, [router]);

  return (
    <div>
      <Head>
        <title>DevSözlük - {topic.title}</title>
        <meta property="og:title" content={topic.title} />
        <meta property="og:description" content={entries[0].content} />
        <meta
          property="twitter:url"
          content={"https://dev.devsozluk.net/topic/" + topic.slug}
        />
        <meta name="twitter:title" content={topic.title} />
        <meta name="twitter:description" content={entries[0].content} />
      </Head>
      <div className="flex mt-3 md:mt-0 flex-col gap-y-5 pb-10 max-w-[750px]">
        <Topic.Header {...topic} />
        <Topic.Entries />
        {isLoggedIn && <Topic.AddEntry />}
      </div>
    </div>
  );
};

Topic.Header = TopicHeader;

Topic.Entries = () => {
  const { entries } = useAppSelector((state) => state.topic);

  return (
    <div className="flex flex-col divide-y-2  divide-opacity-50 divide-gray-800">
      {entries?.map((entry, index) => (
        <Entry
          className={index === 0 ? "pb-5" : "py-5"}
          {...entry}
          key={index}
        />
      ))}
    </div>
  );
};

Topic.AddEntry = TopicAddEntry;

export default Topic;
