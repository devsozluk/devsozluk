import RootLayout from "@/components/Layout/Layout";
import store from "@/store/store";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import MainLayout from "@/components/Layout/MainLayout";
import Head from "@/components/SEO";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import type { Page } from "../types/page";
import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");
import "@/style.css";

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
    <div>
      <Head />
      <Provider store={store}>
        <RootLayout>
          <ComponentLayout>
            {getLayout(<Component {...pageProps} />)}
          </ComponentLayout>
        </RootLayout>
        <Toaster />
      </Provider>
    </div>
  );
};

export default App;
