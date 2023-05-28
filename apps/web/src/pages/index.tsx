import EntriesFilter from "@/components/Home/Filter";
import filterItems, {
  type IFilterItem,
} from "@/components/Home/Filter/Filter.items";
import MainLayout from "@/components/Layout/MainLayout";
import EntryLoader from "@/components/Loading/entry";
import Entry from "@/components/Topic/Entry";
import TopicHeader from "@/components/Topic/Header";
import supabase from "@/libs/supabase";
import { useGetMoreEntriesMutation } from "@/services/topic";
import { setEntries } from "@/store/topic/topicSlice";
import { IEntry } from "@/types";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Spinner } from "@devsozluk/ui";
import classNames from "classnames";
import { GetServerSidePropsContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { filter } = context.query as { filter: string };

  if (!filter) {
    return {
      redirect: {
        destination: "/?filter=latest",
        statusCode: 302,
      },
    };
  }

  const selectedFilters = (
    filterItems.find((item) => item.name === filter) as IFilterItem
  )?.filters;

  const query = supabase
    .from("entries_views")
    .select(`*, author(id, username, avatar_url, name), topic(*)`);

  selectedFilters.forEach((filter) => {
    query.order(filter.order, filter.options);
  });

  const { data, error } = await query.range(0, 10);

  return {
    props: {
      entries: data,
    },
  };
}

const Home = ({ entries }: { entries: IEntry[] }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const topic = useAppSelector((state) => state.topic);
  const [handleFetchMore, { isLoading }] = useGetMoreEntriesMutation();
  const filter = router.query.filter as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    dispatch(setEntries(entries));
  }, []);

  useEffect(() => {
    if (mounted) {
      setPage(0);
      dispatch(setEntries([]));
      handleFetchMore({ page, filter });
    }
  }, [router.query.filter]);

  const fetchMoreData = async () => {
    setPage((prevPage) => prevPage + 1);
    handleFetchMore({ page: page + 1, filter });
  };

  return (
    <MainLayout>
      <NextSeo title="Geliştiriciler için açık kaynaklı sosyal platform" />
      <EntriesFilter />
      {page === 0 && isLoading && <Home.EntryLoader />}
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
            className="flex w-full flex-col divide-y divide-opacity-50 divide-gray-700 !overflow-hidden"
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
      <TopicHeader topic={entry.topic} showDetail={true} />
      <Entry {...entry} />
    </div>
  );
};

Home.EntryLoader = () => {
  return (
    <Fragment>
      <EntryLoader />
      <EntryLoader />
      <EntryLoader />
      <EntryLoader />
    </Fragment>
  );
};

export default Home;
