import { useAppSelector } from "@/utils/hooks";
import { Spinner } from "@devsozluk/ui";
import { useRouter } from "next/router";
import { Fragment, PropsWithChildren, useEffect } from "react";

export default function OnlyUser({ children }: PropsWithChildren): any {
  const router = useRouter();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isLoggedIn && !checkSessionloading) {
      router.push("/");
    }
  }, [isLoggedIn, checkSessionloading]);

  return (
    <Fragment>
      {isLoggedIn && !checkSessionloading ? (
        children
      ) : (
        <Spinner size="md" isFullScreen={true} />
      )}
    </Fragment>
  );
}
