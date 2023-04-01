import { useGetUserMeMutation } from "@/services/auth";
import { Spinner } from "@devsozluk/ui";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useGetUserVotesMutation } from "@/services/user";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function RootLayout({ children }: PropsWithChildren) {
  const [getUserMe, { isLoading }] = useGetUserMeMutation();
  const [getUserVotes] = useGetUserVotesMutation();

  useEffect(() => {
    getUserMe("");
    getUserVotes("");
  }, []);

  return (
    <div className="min-h-screen bg-background text-secondary font-poppins h-full">
      {isLoading ? (
        <Spinner size="md" isFullScreen={true} />
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </div>
  );
}
