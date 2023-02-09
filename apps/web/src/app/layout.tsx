import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import "@/style.css";
import Head from "./head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head />
      <Header />
      <main className="mt-40 flex py-7 md:mt-14">
        <Sidebar />
        <div className="mx-8 h-full w-full md:ml-[300px] md:mr-8 lg:ml-[360px]">
          {children}
        </div>
      </main>
    </>
  );
}
