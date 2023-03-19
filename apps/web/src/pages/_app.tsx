import RootLayout from "@/app/layout";
import store from "@/app/store";
import EmptyLayout from "@/components/Layout/EmptyLayout";
import MainLayout from "@/components/Layout/MainLayout";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import type { Page } from "../types/page";

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
    <Provider store={store}>
      <RootLayout>
        <ComponentLayout>
          {getLayout(<Component {...pageProps} />)}
        </ComponentLayout>
      </RootLayout>
      <Toaster />
    </Provider>
  );
};

export default App;
