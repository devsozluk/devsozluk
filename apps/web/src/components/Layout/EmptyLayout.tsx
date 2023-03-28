import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

export default function EmptyLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-[calc(100%-10px)] justify-between  overflow-auto py-5">
      <div className="h-full w-full">{children}</div>
    </main>
  );
}
