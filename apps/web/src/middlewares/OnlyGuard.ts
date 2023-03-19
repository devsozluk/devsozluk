import { PropsWithChildren } from "react";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/router";

export default function OnlyGuard({ children }: PropsWithChildren): any {
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn) router.push("/");
  return children;
}
