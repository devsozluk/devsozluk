import { useGetUserMeMutation } from "@/services/auth";
import { useGetPopularTopicsMutation } from "@/services/topic";
import { useGetUserVotesMutation } from "@/services/user";
import { useAppSelector } from "@/utils/hooks";
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
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const [getPopularTopics] = useGetPopularTopicsMutation();
  const [getUserMe, { status }] = useGetUserMeMutation();
  const [getUserVotes] = useGetUserVotesMutation();

  useEffect(() => {
    getUserMe("");
    getPopularTopics({ page: 0 });
  }, []);

  useEffect(() => {
    if (status === "fulfilled" && user) {
      getUserVotes({ id: user.id });
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-background text-secondary font-poppins h-full">
      <Fragment>
        {isLoggedIn && <CreateTopicModal />}
        {children}
        <a href="https://www.producthunt.com/products/devsozluk/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-devsozluk" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=549647&theme=light" alt="DevS&#0246;zl&#0252;k - Open&#0032;source&#0032;social&#0032;platform&#0032;for&#0032;developers&#0046; | Product Hunt" style={{position: "fixed", right: isLoggedIn ? 100 : 50, bottom: 30, width: 250, height: 50}} width="250" height="50" /></a>
        {isLoggedIn && <Actions />}
      </Fragment>
    </div>
  );
}
