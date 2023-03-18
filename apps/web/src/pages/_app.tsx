import RootLayout from "@/app/layout";
import MainLayout from "@/components/Layout/MainLayout";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import type { Page } from "../types/page";

type Props = AppProps & {
  Component: Page;
};
const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  if (Component.layout)
    return (
      <RootLayout>
        <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
      </RootLayout>
    );

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default MyApp;
