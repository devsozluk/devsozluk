import { checkSession } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Head from "./head";
import { Spinner } from "@devsozluk/ui";
import "@/style.css";

export default function RootLayout({ children }: PropsWithChildren) {
  const { checkSessionLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <div className="h-screen bg-background text-secondary font-poppins">
      {checkSessionLoading ? (
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
