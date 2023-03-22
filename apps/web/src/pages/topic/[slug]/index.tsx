import Entry from "@/components/Elements/Entry";
import supabase from "@/libs/supabase";
import { IEntry, ITopic } from "@/types";
import { Button, TextArea } from "@devsozluk/ui";
import { GetServerSidePropsContext, NextApiHandler } from "next";
import Link from "next/link";

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
  console.log(entries);

  return (
    <div className="flex max-w-3xl flex-col gap-y-5 pb-10">
      <div>div</div>
      <div className="flex items-center justify-between">
        <Link href={"/konu/" + topic.slug} className="mb-1 text-lg font-bold text-primary">
          {topic.title}
        </Link>
      </div>
      {entries?.map((entry, index) => (
        <Entry {...entry} key={index} />
      ))}
      <TextArea placeholder="Göndermek istediğin mesajı yaz." rows={4} >
        <TextArea.Actions>
          <Button className="ml-auto" size="sm">Gönder</Button>
        </TextArea.Actions>
      </TextArea>
    </div>
  )
};

export default Topic;
