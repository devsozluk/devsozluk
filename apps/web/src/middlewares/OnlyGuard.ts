import { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";

export default function OnlyGuard({ children }: PropsWithChildren): any {
  const router = useRouter();
  const { checkSessionLoading, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!checkSessionLoading && isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router, checkSessionLoading]);

  return children;
}
