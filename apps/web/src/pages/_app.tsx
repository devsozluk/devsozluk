import RootLayout from "@/components/Layout/Layout";
import store from "@/store/store";
import "@/style.css";
import { Analytics } from "@vercel/analytics/react";
import moment from "moment";
import "moment/locale/tr";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "tippy.js/dist/tippy.css";
import seo from "../../next-seo.config";
import type { Page } from "../types/page";
moment.locale("tr");

type Props = AppProps & {
  Component: Page;
};

const App = ({ Component, pageProps }: Props) => {
  return (
    <>
      <DefaultSeo {...seo} />
      <Provider store={store}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <Toaster />
      </Provider>
      <Analytics />
    </>
  );
};

export default App;
