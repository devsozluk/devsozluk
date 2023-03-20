import { PropsWithChildren, useEffect } from "react";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";

export default function OnlyUser({ children }: PropsWithChildren): any {
  const router = useRouter();
  const { checkSessionLoading, isLoggedIn } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!checkSessionLoading && !isLoggedIn) {
      router.push("/auth/login");
    }
  }, [isLoggedIn, router, checkSessionLoading]);

  return children;
}
