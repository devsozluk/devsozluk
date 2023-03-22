import ProfileTabs from "@/components/ProfileTabs";
import OnlyUser from "@/middlewares/OnlyUser";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <OnlyUser>
      <div className="mt-20 flex items-center justify-center flex-col">
        <ProfileTabs />
        <div className="mt-4">{children}</div>
      </div>
    </OnlyUser>
  );
}
