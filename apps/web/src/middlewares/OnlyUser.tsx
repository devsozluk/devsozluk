import { useAppSelector } from "@/utils/hooks";
import { Spinner } from "@devsozluk/ui";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export default function OnlyUser({ children }: PropsWithChildren): any {
  const router = useRouter();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isLoggedIn && !checkSessionloading) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, checkSessionloading]);

  return (
    <>
      {isLoggedIn && !checkSessionloading ? (
        children
      ) : (
        <Spinner size="md" isFullScreen={true} />
      )}
    </>
  );
}
