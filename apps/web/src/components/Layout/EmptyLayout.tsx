import { PropsWithChildren } from "react";

export default function EmptyLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-[calc(100%-10px)] justify-between space-x-20 overflow-auto py-5">
      <div className="h-full w-full px-20">{children}</div>
    </main>
  );
}
