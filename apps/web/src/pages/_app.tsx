import RootLayout from "@/app/layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Spinner } from "@devsozluk/ui";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-screen bg-background text-secondary font-poppins">
      {loading ? (
        <Spinner />
      ) : (
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      )}
    </div>
  );
}
