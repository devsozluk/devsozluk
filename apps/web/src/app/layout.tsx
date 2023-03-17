import Header from "@/components/Layout/Header";
import "@/style.css";
import { Fragment } from "react";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Head />
      <Header />
      <main className="mt-40 flex py-10 md:mt-14">
        <div className="mx-8 h-full w-full md:ml-[300px] md:mr-8 lg:ml-[360px]">
          {children}
        </div>
      </main>
    </Fragment>
  );
}
