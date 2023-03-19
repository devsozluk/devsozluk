import { checkSession } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Head from "./head";
import "@/style.css";
import { Spinner } from "@devsozluk/ui";

export default function RootLayout({ children }: PropsWithChildren) {
  const { isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <div className="h-screen bg-background text-secondary font-poppins">
      {isLoading ? (
        <Spinner size="md" isFullScreen={true} />
      ) : (
        <Fragment>
          {" "}
          <Head />
          {children}
        </Fragment>
      )}
    </div>
  );
}
