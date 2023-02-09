import { Spinner } from "@devsozluk/ui";
import React from "react";

export const getServerSideProps = async () => {
  const delay = (s: any) => new Promise((resolve) => setTimeout(resolve, s));
  await delay(5000);

  return {
    props: {
      test: "test",
    },
  };
};

const Home = ({ test }: any) => {
  setTimeout(() => {
    console.log("test");
  }, 5000);
};

export default Home;
