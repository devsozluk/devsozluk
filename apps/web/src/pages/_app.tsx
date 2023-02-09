import RootLayout from "@/app/layout";
import store from "@/store";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner } from "@devsozluk/ui";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on("routeChangeError", (e) => setLoading(false));
    router.events.on("routeChangeStart", (e) => setLoading(false));
    router.events.on("routeChangeComplete", (e) => setLoading(true));

    return () => {
      router.events.off("routeChangeError", (e) => setLoading(false));
      router.events.off("routeChangeStart", (e) => setLoading(false));
      router.events.off("routeChangeComplete", (e) => setLoading(true));
    };
  }, [router.events]);

  return (
    <div className="h-screen bg-background text-secondary font-poppins">
      {loading ? (
        <Spinner />
      ) : (
        <Provider store={store}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </Provider>
      )}
    </div>
  );
}
