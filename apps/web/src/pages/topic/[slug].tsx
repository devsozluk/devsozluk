import supabase from "@/libs/supabase";
import { ITopic } from "@/types";
import { GetServerSidePropsContext, NextApiHandler } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params as { slug: string };

  const { data, error } = await supabase
    .from("topics")
    .select("*, author(*)")
    .eq("slug", slug)
    .single();

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
    },
  };
}

const Topic = ({ topic }: { topic: ITopic }) => {
  return <div>{topic?.title}</div>;
};

export default Topic;
