import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import Header from "./Header";

export default function EmptyLayout({ children }: PropsWithChildren) {
  const router = useRouter();
  const hasDashboard = router.pathname.includes("dashboard");

  return (
    <main className="flex h-[calc(100%-10px)] justify-between  overflow-auto py-5">
      {hasDashboard && <Header />}
      <div className="h-full w-full">{children}</div>
    </main>
  );
}
