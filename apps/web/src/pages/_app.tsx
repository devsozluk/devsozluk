import EmptyLayout from "@/components/Layout/EmptyLayout";
import RootLayout from "@/components/Layout/Layout";
import MainLayout from "@/components/Layout/MainLayout";
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
    <div>
      <DefaultSeo
        titleTemplate="%s | Dev Sözlük"
        defaultTitle="Dev Sözlük"
        description="Dev Sözlük, yazılım geliştiricileri için bir sözlük. Yazılım geliştirme ile ilgili her türlü konuyu burada tartışabilirsiniz."
        canonical="https://dev.devsozuk.net"
        openGraph={{
          url: "https://dev.devsozuk.net",
          title: "Dev Sözlük",
          description:
            "Dev Sözlük, yazılım geliştiricileri için bir sözlük. Yazılım geliştirme ile ilgili her türlü konuyu burada tartışabilirsiniz.",
          images: [
            {
              url: "/banner.png",
              width: 800,
              height: 420,
              alt: "Dev Sözlük",
            },
          ],
        }}
        twitter={{
          handle: "@devsozluk",
          site: "@devsozluk",
          cardType: "summary_large_image",
        }}
      />
      <Provider store={store}>
        <RootLayout>
          <ComponentLayout>
            {getLayout(<Component {...pageProps} />)}
          </ComponentLayout>
        </RootLayout>
        <Toaster />
      </Provider>
      <Analytics />
    </div>
  );
};

export default App;
