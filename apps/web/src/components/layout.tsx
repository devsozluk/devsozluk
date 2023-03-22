import { useGetUserMeMutation } from "@/services/auth";
import { Spinner } from "@devsozluk/ui";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Head from "../components/head";

export default function RootLayout({ children }: PropsWithChildren) {
  const [getUserMe, { isLoading }] = useGetUserMeMutation();

  useEffect(() => {
    getUserMe("");
  }, []);

  return (
    <div className="h-screen bg-background text-secondary font-poppins">
      {isLoading ? (
        <Spinner size="md" isFullScreen={true} />
      ) : (
        <Fragment>
          <Head />
          {children}
        </Fragment>
      )}
    </div>
  );
}
