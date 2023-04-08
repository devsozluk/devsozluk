import { useGetUserMeMutation } from "@/services/auth";
import { useGetUserVotesMutation } from "@/services/user";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Spinner } from "@devsozluk/ui";
import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Fragment, PropsWithChildren, useEffect } from "react";
import CreateTopicModal from "../CreateTopicModal";
import Actions from "./Actions";

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
  const dispatch = useAppDispatch();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );
  const [getUserMe, { isLoading }] = useGetUserMeMutation();
  const [getUserVotes] = useGetUserVotesMutation();

  useEffect(() => {
    getUserMe("");
  }, []);

  return (
    <div className="min-h-screen bg-background text-secondary font-poppins h-full">
      {checkSessionloading || isLoading ? (
        <Spinner size="md" isFullScreen={true} />
      ) : (
        <Fragment>
          {isLoggedIn && <CreateTopicModal />}
          {children}
          {isLoggedIn && <Actions />}
        </Fragment>
      )}
    </div>
  );
}
