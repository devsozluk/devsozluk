import EmptyLayout from "@/components/Layout/EmptyLayout";
import RootLayout from "@/components/Layout/Layout";
import MainLayout from "@/components/Layout/MainLayout";
import store from "@/store/store";
import "@/style.css";
import { Analytics } from "@vercel/analytics/react";
import moment from "moment";
import "moment/locale/tr";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "tippy.js/dist/tippy.css";
import seo from "../../next-seo.config";
import type { Page } from "../types/page";
moment.locale("tr");

type Props = AppProps & {
  Component: Page;
};

const getRootLayout = (Component: any) => {
  return Component.getLayout ? EmptyLayout : MainLayout;
};

const App = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const ComponentLayout = getRootLayout(Component);

  return (
    <Fragment>
      <NextSeo {...seo} />
      <Provider store={store}>
        <RootLayout>
          <ComponentLayout>
            {getLayout(<Component {...pageProps} />)}
          </ComponentLayout>
        </RootLayout>
        <Toaster />
      </Provider>
      <Analytics />
    </Fragment>
  );
};

export default App;
