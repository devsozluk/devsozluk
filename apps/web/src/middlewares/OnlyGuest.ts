import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

export default function OnlyGuard({ children }: PropsWithChildren): any {
  const router = useRouter();
  const { isLoggedIn, checkSessionloading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isLoggedIn && !checkSessionloading) {
      router.push("/");
    }
  }, [isLoggedIn, checkSessionloading]);

  return children;
}
