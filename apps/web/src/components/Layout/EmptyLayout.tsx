import { PropsWithChildren } from "react";

export default function EmptyLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-[calc(100%-10px)] justify-between">
      <div className="h-full w-full">{children}</div>
    </main>
  );
}
