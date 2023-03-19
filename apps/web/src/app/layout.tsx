import { checkSession } from "@/store/auth/authThunk";
import { useAppDispatch } from "@/utils/hooks";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Head from "./head";
import "@/style.css";

export default function RootLayout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return (
    <Fragment>
      <Head />
      {children}
    </Fragment>
  );
}
