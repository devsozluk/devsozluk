import MainLayout from "@/components/Layout/MainLayout";
import Entry from "@/components/Topic/Entry";
import TopicHeader from "@/components/Topic/Header";
import supabase from "@/libs/supabase";
import { useGetMoreEntriesMutation } from "@/services/topic";
import { setTopic } from "@/store/topic/topicSlice";
import { IEntry } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Spinner } from "@devsozluk/ui";
import classNames from "classnames";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("entries")
    .select("*, author(*), topic(slug, title, entryCount, viewsCount)")
    .order("created_at", { ascending: false })
    .range(0, 10);

  return {
    props: {
      entries: data,
    },
  };
}

const Home = ({ entries }: { entries: IEntry[] }) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const topic = useAppSelector((state) => state.topic);
  const [handleFetchMore, { isLoading }] = useGetMoreEntriesMutation();
  const [filer, setFilter] = useState("latest");

  useEffect(() => {
    dispatch(setTopic({ entries }));
  }, []);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
    handleFetchMore({ page: page + 1 });
  };

  return (
    <MainLayout>
      <div className="mb-6 flex gap-x-2 flex-wrap gap-y-2">
        <div className="max-w-3xl w-full">
          <InfiniteScroll
            loader={
              isLoading && (
                <div className="flex justify-center pt-5 items-center">
                  <Spinner />
                </div>
              )
            }
            next={fetchMoreData}
            dataLength={topic?.entries?.length}
            hasMore={true}
            className="flex w-full flex-col divide-y divide-opacity-30 divide-gray-700 !overflow-hidden"
          >
            {topic?.entries?.map((entry, index) => (
              <Home.EntryCard key={entry.id} entry={entry} index={index} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </MainLayout>
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
      <TopicHeader topic={topic} showDetail={true} />
      <Entry {...entry} />
    </div>
  );
};

export default Home;
