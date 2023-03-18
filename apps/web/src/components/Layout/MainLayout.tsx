import Header from "@/components/Layout/Header";
import "@/style.css";
import { Fragment } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <div className="h-screen bg-background text-secondary font-poppins">
        <Header />
        <main className="mt-40 flex py-7 md:mt-14">
          <div className="mx-8 h-full w-full md:ml-[300px] md:mr-8 lg:ml-[360px]">
            {children}
          </div>
        </main>
      </div>
    </Fragment>
  );
}
